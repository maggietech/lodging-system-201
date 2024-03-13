import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import { Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal } from "azle/canisters/ledger";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

// Define record types for different entities
const House = Record({
    id: text,
    name: text,
    owner: Principal,
    created_date: nat64,
    updated_at: Opt(nat64),
});

const Room = Record({
    id: text,
    house_id: text,
    room_number: text,
    is_booked: bool,
    price: text,
    created_date: nat64,
    updated_at: Opt(nat64),
});

const Guest = Record({
    id: text,
    name: text,
    created_date: nat64,
});

const Reservation = Record({
    id: text,
    room_id: text,
    guest_id: text,
    check_in_date: nat64,
    check_out_date: nat64,
    created_date: nat64,
});

const Payment = Record({
    id: text,
    reservation_id: text,
    amount: text,
    created_date: nat64,
    updated_at: Opt(nat64),
});

const RoomPayload = Record({
    house_id: text,
    room_number: text,
    price: text,
});

const ReservationPayload = Record({
    room_id: text,
    guest_id: text,
    check_in_date: nat64,
    check_out_date: nat64,
});

const PaymentPayload = Record({
    reservation_id: text,
    amount: text,
});

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

export default Canister({
    /**
     * Function to register a house.
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