import { query, nat, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import { Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal } from "azle/canisters/ledger";
import { v4 as uuidv4 } from "uuid";

// Define record types for different entities
const House = Record({
    id: text,
    name: text,
    address: text,
    description: text,

});

const Room = Record({
    id: text,
    house_id: text,
    room_number: text,
    is_booked: bool,
    capacity: text,
    price_per_night: text,
    reservation_id: Opt(text)
});

const Guest = Record({
    id: text,
    name: text,
    principal: Principal,
   email: text,
   phone: text,
});

const Reservation = Record({
    id: text, 
    house_id: text,
    room_id: text,
    guest_id: text,
    check_in_date: text,
    check_out_date: text,
});

const RoomPayload = Record({
    house_id: text,
    room_number: text,
    capacity: text,
    price_per_night: text,  
});

const ReservationPayload = Record({
    house_id: text,
    room_id: text,
    guest_id: text,
    check_in_date: text,
    check_out_date: text,
});
const UpdateReservationPayload = Record({
    check_in_date: nat,
    check_out_date: nat,
});


const HousePayload = Record({
    name: text,
    address: text,
    description: text,
});

const GuestPayload = Record({
    name: text,
    email: text,
    phone: text,
});

const Message = Variant ({
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text,
    NotAuthorized: text,
})
// Create instances of StableBTreeMap for each entity type
const houseStorage = StableBTreeMap(0, text, House);
const roomStorage = StableBTreeMap(1, text, Room);
const guestStorage = StableBTreeMap(2, text, Guest);
const reservationStorage = StableBTreeMap(3, text, Reservation);

const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));
export default Canister({
 
    // get Houses
    getHouses: query([], Vec(House), () => {
        return houseStorage.values();
    }),


    // get House
    getHouse: query([text], Result(House, Message), (id) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const houseOpt = houseStorage.get(id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${id} not found` });
        }
        return Ok(houseOpt.Some);
    }),

    // create House
    createHouse: update([HousePayload], Result(House, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }

        const validatePayloadErrors = validateHousePayload(payload);
        if (validatePayloadErrors.length){
            return Err({InvalidPayload: `Invalid payload. Errors=[${validatePayloadErrors}]`});
        }

        const house = { id: uuidv4(), ...payload };
        houseStorage.insert(house.id, house);
        return Ok(house);
    }),

    // update house with id
    updateHouse: update([text, HousePayload], Result(House, Message), (id, payload) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const houseOpt = houseStorage.get(id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${id} not found` });
        }

        const validatePayloadErrors = validateHousePayload(payload);
        if (validatePayloadErrors.length){
            return Err({InvalidPayload: `Invalid payload. Errors=[${validatePayloadErrors}]`});
        }

        const house = houseOpt.Some;
        houseStorage.insert(house.id, { ...house, ...payload });
        return Ok(house);
    }),

    // Search House by name or description
    searchHouse: query([text], Vec(House), (query) => {
        return houseStorage.values().filter((house) => {
            return house.name.includes(query) || house.description.includes(query);
        });
    }),

    // get Rooms
    getRooms: query([], Vec(Room), () => {
        return roomStorage.values();
    }),

    // get Room
    getRoom: query([text], Result(Room, Message), (id) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const roomOpt = roomStorage.get(id);
        if ("None" in roomOpt) {
            return Err({ NotFound: `room with id=${id} not found` });
        }
        return Ok(roomOpt.Some);
    }),

    // create Room
    createRoom: update([RoomPayload], Result(Room, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }

        const room = { id: uuidv4(), reservation_id: None, is_booked: false, ...payload };
        roomStorage.insert(room.id, room);
        return Ok(room);
    }),

    // update room with id
    updateRoom: update([text, RoomPayload], Result(Room, Message), (id, payload) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const roomOpt = roomStorage.get(id);
        if ("None" in roomOpt) {
            return Err({ NotFound: `room with id=${id} not found` });
        }

        const room = roomOpt.Some;
        roomStorage.insert(room.id, { ...room, ...payload });
        return Ok(room);
    }),

    // get Guests
    getGuests: query([], Vec(Guest), () => {
        return guestStorage.values();
    }),

    // get Guest
    getGuest: query([text], Result(Guest, Message), (id) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const guestOpt = guestStorage.get(id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${id} not found` });
        }
        return Ok(guestOpt.Some);
    }),

    // create Guest
    createGuest: update([GuestPayload], Result(Guest, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }
        const validatePayloadErrors = validateGuestPayload(payload);
        if (validatePayloadErrors.length){
            return Err({InvalidPayload: `Invalid payload. Errors=[${validatePayloadErrors}]`});
        }
        const guest = { id: uuidv4(), principal: ic.caller(), ...payload };
        guestStorage.insert(guest.id, guest);
        return Ok(guest);
    }),

    // update guest with id
    updateGuest: update([text, GuestPayload], Result(Guest, Message), (id, payload) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const guestOpt = guestStorage.get(id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${id} not found` });
        }

        if(guestOpt.Some.principal.toString() != ic.caller().toString()){
            return Err({NotAuthorized: `Caller isn't the guest's principal`})
        }

        const validatePayloadErrors = validateGuestPayload(payload);
        if (validatePayloadErrors.length){
            return Err({InvalidPayload: `Invalid payload. Errors=[${validatePayloadErrors}]`});
        }

        const guest = guestOpt.Some;
        guestStorage.insert(guest.id, { ...guest, ...payload });
        return Ok(guest);
    }),  

    // get Reservations
    getReservations: query([], Vec(Reservation), () => {
        return reservationStorage.values();
    }),

    // get Reservation
    getReservation: query([text], Result(Reservation, Message), (id) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err({ NotFound: `reservation with id=${id} not found` });
        }
        return Ok(reservationOpt.Some);
    }),

    // create Reservation
    createReservation: update([ReservationPayload], Result(Reservation, Message), async (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }

        const roomOpt = roomStorage.get(payload.room_id);
        if ("None" in roomOpt) {
            return Err({ NotFound: `room with id=${payload.room_id} not found` });
        }

        const room = roomOpt.Some;

        if(room.house_id != payload.house_id){
            return Err({InvalidPayload: `Payload's house_id doesn't match with the room's house_id`})
        }
        if (room.is_booked) {
            return Err({ InvalidPayload: `room with id=${payload.room_id} is already booked` });
        }

        const guestOpt = guestStorage.get(payload.guest_id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${payload.guest_id} not found` });
        }

        const guest = guestOpt.Some;
        if(guest.principal.toString() != ic.caller().toString()){
            return Err({NotAuthorized: `Caller isn't the guest's principal`})
        }
        const houseOpt = houseStorage.get(payload.house_id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${payload.house_id} not found` });
        }

        const house = houseOpt.Some;

        const reservation = { id: uuidv4(), ...payload };

        room.is_booked = true;
        room.reservation_id = Some(reservation.id)

        reservationStorage.insert(reservation.id, reservation);
        roomStorage.insert(room.id, room);
        return Ok(reservation);
    }),

    // update reservation with id
    updateReservation: update([text, UpdateReservationPayload], Result(Reservation, Message), (id, payload) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err({ NotFound: `reservation with id=${id} not found` });
        }

        const reservation = reservationOpt.Some;
        reservationStorage.insert(reservation.id, { ...reservation, ...payload });
        return Ok(reservation);
    }),
    // end reservation with id
    endReservation: update([text], Result(Reservation, Message), (id) => {
        if(!isValidUuid(id)){
            return Err({InvalidPayload: `Id="${id}" is not in the valid uuid format.`})
        }
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err({ NotFound: `reservation with id=${id} not found` });
        }
        const reservation = reservationOpt.Some
        const roomOpt = roomStorage.get(reservation.room_id);
        if ("None" in roomOpt) {
            return Err({ NotFound: `room with id=${reservation.guest_id} not found` });
        }
        const room = roomOpt.Some;
        if ("None" in room.reservation_id || room.reservation_id.Some != id){
            return Err({InvalidPayload: `This room wasn't booked with this reservation_id=${id}`})
        }
        const guestOpt = guestStorage.get(reservation.guest_id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${reservation.guest_id} not found` });
        }
        const guest = guestOpt.Some;
        if(guest.principal.toString() != ic.caller().toString()){
            return Err({NotAuthorized: `Caller isn't the guest's principal`})
        }
        room.is_booked = false;
        room.reservation_id = None;
        roomStorage.insert(room.id, room)

        return Ok(reservation);
    }),

    // get Reservations by house id
    getReservationsByHouseId: query([text], Vec(Reservation), (house_id) => {
        
        return reservationStorage.values().filter((reservation) => {
            return reservation.house_id === house_id;
        });
    }),

    // get Reservations by guest id
    getReservationsByGuestId: query([text], Vec(Reservation), (guest_id) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.guest_id === guest_id;
        });
    }),

    // get Reservations by room id
    getReservationsByRoomId: query([text], Vec(Reservation), (room_id) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.room_id === room_id;
        });
    }),

    // get Reservations by check in date
    getReservationsByCheckInDate: query([text], Vec(Reservation), (check_in_date) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.check_in_date === check_in_date;
        });
    }),

    // get Reservations by check out date
    getReservationsByCheckOutDate: query([text], Vec(Reservation), (check_out_date) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.check_out_date === check_out_date;
        });
    }),


    // get Reservations by house id and check in date
    getReservationsByHouseIdAndCheckInDate: query([text, text], Vec(Reservation), (house_id, check_in_date) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.house_id === house_id && reservation.check_in_date === check_in_date;
        });
    }),

    // get Reservations by house id and check out date
    getReservationsByHouseIdAndCheckOutDate: query([text, text], Vec(Reservation), (house_id, check_out_date) => {
        return reservationStorage.values().filter((reservation) => {
            return reservation.house_id === house_id && reservation.check_out_date === check_out_date;
        });
    }),




 
 
});


// Helper function that trims the input string and then checks the length
// The string is empty if true is returned, otherwise, string is a valid value
function isInvalidString(str: text): boolean {
    return str.trim().length == 0
  }
  
  // Helper function to ensure the input id meets the format used for ids generated by uuid
  function isValidUuid(id: string): boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(id);
  }
  
  /**
  * Helper function to validate the HousePayload
  */
  function validateHousePayload(payload: typeof HousePayload): Vec<string>{
    const errors: Vec<text> = [];
    // @ts-ignore
    if (isInvalidString(payload.address)){
        errors.push(`address='${payload.address}' cannot be empty.`)
    }
    // @ts-ignore
    if (isInvalidString(payload.description)){
        errors.push(`description='${payload.description}' cannot be empty.`)
    }
    // @ts-ignore
    if (isInvalidString(payload.name)){
        errors.push(`name='${payload.name}' cannot be empty.`)
    }
    return errors;
  }
  /**
  * Helper function to validate the GuestPayload
  */
  function validateGuestPayload(payload: typeof GuestPayload): Vec<string>{
    const errors: Vec<text> = [];
    const validPhoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    if (!validEmailRegex.test(payload.email)){
        errors.push(`email='${payload.email}' is not in the valid format.`)
    }
    if (isInvalidString(payload.name)){
        errors.push(`name='${payload.name}' cannot be empty.`)
    }
    if (!validPhoneNumberRegex.test(payload.phone)){
        errors.push(`phone number is not in the valid format. It must be in the following formats: (123)-456-7890, 123-456-7890, or 123456-7890`)
    }
    return errors;
  }


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