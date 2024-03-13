import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import { Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal } from "azle/canisters/ledger";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

/**
 * Define record types for different entities.
 * @typedef {Object} House - Represents a house entity.
 * @property {string} id - The ID of the house.
 * @property {string} name - The name of the house.
 * @property {Principal} owner - The owner's principal ID.
 * @property {nat64} created_date - The timestamp when the house was created.
 * @property {Opt<nat64>} updated_at - The timestamp when the house was last updated (optional).
 */
const House = Record({
    id: text,
    name: text,
    owner: Principal,
    created_date: nat64,
    updated_at: Opt(nat64),
});

/**
 * Define record types for different entities.
 * @typedef {Object} Room - Represents a room entity.
 * @property {string} id - The ID of the room.
 * @property {string} house_id - The ID of the house the room belongs to.
 * @property {string} room_number - The room number.
 * @property {bool} is_booked - Indicates whether the room is booked or not.
 * @property {text} price - The price of the room.
 * @property {nat64} created_date - The timestamp when the room was created.
 * @property {Opt<nat64>} updated_at - The timestamp when the room was last updated (optional).
 */
const Room = Record({
    id: text,
    house_id: text,
    room_number: text,
    is_booked: bool,
    price: text,
    created_date: nat64,
    updated_at: Opt(nat64),
});

/**
 * Define record types for different entities.
 * @typedef {Object} Guest - Represents a guest entity.
 * @property {string} id - The ID of the guest.
 * @property {string} name - The name of the guest.
 * @property {nat64} created_date - The timestamp when the guest was created.
 */
const Guest = Record({
    id: text,
    name: text,
    created_date: nat64,
});

/**
 * Define record types for different entities.
 * @typedef {Object} Reservation - Represents a reservation entity.
 * @property {string} id - The ID of the reservation.
 * @property {string} room_id - The ID of the room reserved.
 * @property {string} guest_id - The ID of the guest making the reservation.
 * @property {nat64} check_in_date - The check-in date of the reservation.
 * @property {nat64} check_out_date - The check-out date of the reservation.
 * @property {nat64} created_date - The timestamp when the reservation was created.
 */
const Reservation = Record({
    id: text,
    room_id: text,
    guest_id: text,
    check_in_date: nat64,
    check_out_date: nat64,
    created_date: nat64,
});

/**
 * Define record types for different entities.
 * @typedef {Object} Payment - Represents a payment entity.
 * @property {string} id - The ID of the payment.
 * @property {string} reservation_id - The ID of the reservation associated with the payment.
 * @property {text} amount - The amount of the payment.
 * @property {nat64} created_date - The timestamp when the payment was created.
 * @property {Opt<nat64>} updated_at - The timestamp when the payment was last updated (optional).
 */
const Payment = Record({
    id: text,
    reservation_id: text,
    amount: text,
    created_date: nat64,
    updated_at: Opt(nat64),
});

/**
 * Define record types for payload data.
 * @typedef {Object} RoomPayload - Payload for creating or updating a room.
 * @property {string} house_id - The ID of the house the room belongs to.
 * @property {string} room_number - The room number.
 * @property {text} price - The price of the room.
 */
const RoomPayload = Record({
    house_id: text,
    room_number: text,
    price: text,
});

/**
 * Define record types for payload data.
 * @typedef {Object} ReservationPayload - Payload for creating a reservation.
 * @property {string} room_id - The ID of the room reserved.
 * @property {string} guest_id - The ID of the guest making the reservation.
 * @property {nat64} check_in_date - The check-in date of the reservation.
 * @property {nat64} check_out_date - The check-out date of the reservation.
 */
const ReservationPayload = Record({
    room_id: text,
    guest_id: text,
    check_in_date: nat64,
    check_out_date: nat64,
});

/**
 * Define record types for payload data.
 * @typedef {Object} PaymentPayload - Payload for processing a payment.
 * @property {string} reservation_id - The ID of the reservation associated with the payment.
 * @property {text} amount - The amount of the payment.
 */
const PaymentPayload = Record({
    reservation_id: text,
    amount: text,
});

/**
 * Define response type for payment operations.
 * @typedef {Object} PaymentResponse - Response object for payment operations.
 * @property {string} msg - Message indicating the status of the payment operation.
 * @property {nat64} amount - The amount involved in the payment operation.
 */
const PaymentResponse = Record({
    msg: text,
    amount: nat64,
});

// Create instances of StableBTreeMap for each entity type
const houseStorage = StableBTreeMap(0, text, House);
const roomStorage = StableBTreeMap(1, text, Room);
const guestStorage = StableBTreeMap(2, text, Guest);
const reservationStorage = StableBTreeMap(3, text, Reservation);
const paymentStorage = StableBTreeMap(4, text, Payment);

/**
 * Define Canister interface for managing properties and functions related to booking system.
 * @typedef {Canister} BookingSystemCanister
 */
export default Canister({
    /**
     * Function to register a house.
     * @param {string} id - The ID of the house.
     * @param {string} name - The name of the house.
     * @param {Principal} owner - The owner's principal ID.
     * @returns {text} - Confirmation message.
     */
    registerHouse: update([text, text, Principal], text, (id, name, owner) => {
        const house = {
            id: id,
            name: name,
            owner: owner,
            created_date: ic.time(),
            updated_at: None
        };
        houseStorage.insert(id, house);
        return `House registered successfully with ID ${id}`;
    }),

    /**
     * Function to register a room.
     * @param {string} id - The ID of the room.
     * @param {string} house_id - The ID of the house the room belongs to.
     * @param {string} room_number - The room number.
     * @param {bool} is_booked - Indicates whether the room is booked or not.
     * @param {text} price - The price of the room.
     * @returns {text} - Confirmation message.
     */
    registerRoom: update([text, text, text, bool, text], text, (id, house_id, room_number, is_booked, price) => {
        const room = {
            id: id,
            house_id: house_id,
            room_number: room_number,
            is_booked: is_booked,
            price: price,
            created_date: ic.time(),
            updated_at: None
        };
        roomStorage.insert(id, room);
        return `Room registered successfully with ID ${id}`;
    }),

    /**
     * Function to register a guest.
     * @param {string} id - The ID of the guest.
     * @param {string} name - The name of the guest.
     * @returns {text} - Confirmation message.
     */
    registerGuest: update([text, text], text, (id, name) => {
        const guest = {
            id: id,
            name: name,
            created_date: ic.time()
        };
        guestStorage.insert(id, guest);
        return `Guest registered successfully with ID ${id}`;
    }),

    /**
     * Function to create a reservation.
     * @param {string} id - The ID of the reservation.
     * @param {string} room_id - The ID of the room reserved.
     * @param {string} guest_id - The ID of the guest making the reservation.
     * @param {nat64} check_in_date - The check-in date of the reservation.
     * @param {nat64} check_out_date - The check-out date of the reservation.
     * @returns {text} - Confirmation message.
     */
    createReservation: update([text, text, text, nat64, nat64], text, (id, room_id, guest_id, check_in_date, check_out_date) => {
        const reservation = {
            id: id,
            room_id: room_id,
            guest_id: guest_id,
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            created_date: ic.time()
        };
        reservationStorage.insert(id, reservation);
        return `Reservation created successfully with ID ${id}`;
    }),

    /**
     * Function to process a payment.
     * @param {string} id - The ID of the payment.
     * @param {string} reservation_id - The ID of the reservation associated with the payment.
     * @param {text} amount - The amount of the payment.
     * @returns {Result<text, text>} - Result indicating the success or failure of the payment operation.
     */
    processPayment: update([text, text, text], Result(text, text), (id, reservation_id, amount) => {
        const reservationOpt = reservationStorage.get(reservation_id);
        if ("None" in reservationOpt) {
            return Err("Reservation not found.");
        }

        const payment = {
            id: id,
            reservation_id: reservation_id,
            amount: amount,
            created_date: ic.time(),
            updated_at: None
        };
        paymentStorage.insert(id, payment);

        // Update reservation status to reflect payment processed
        const reservation = reservationOpt.Some;
        reservationStorage.insert(reservation_id, {...reservation, updated_at: Some(ic.time())});

        return Ok(`Payment processed successfully with ID ${id}`);
    }),

    /**
     * Function to get payment details.
     * @param {string} id - The ID of the payment.
     * @returns {Result<PaymentResponse, text>} - Result containing payment details or error message.
     */
    getPaymentDetails: query([text], Result(PaymentResponse, text), (id) => {
        const paymentOpt = paymentStorage.get(id);
        if ("None" in paymentOpt) {
            return Err("Payment not found.");
        }

        const payment = paymentOpt.Some;
        return Ok({
            msg: `Payment details for payment ID ${id}`,
            amount: payment.amount
        });
    }),

    /**
     * Function to get reservation details.
     * @param {string} id - The ID of the reservation.
     * @returns {Result<Reservation, text>} - Result containing reservation details or error message.
     */
    getReservationDetails: query([text], Result(Reservation, text), (id) => {
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err("Reservation not found.");
        }
        return Ok(reservationOpt.Some);
    }),

    /**
     * Function to get room details.
     * @param {string} id - The ID of the room.
     * @returns {Result<Room, text>} - Result containing room details or error message.
     */
    getRoomDetails: query([text], Result(Room, text), (id) => {
        const roomOpt = roomStorage.get(id);
        if ("None" in roomOpt) {
            return Err("Room not found.");
        }
        return Ok(roomOpt.Some);
    }),

    /**
     * Function to get house details.
     * @param {string} id - The ID of the house.
     * @returns {Result<House, text>} - Result containing house details or error message.
     */
    getHouseDetails: query([text], Result(House, text), (id) => {
        const houseOpt = houseStorage.get(id);
        if ("None" in houseOpt) {
            return Err("House not found.");
        }
        return Ok(houseOpt.Some);
    }),
});

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
