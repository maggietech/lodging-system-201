import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
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
});

const Guest = Record({
    id: text,
    name: text,
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
    PaymentCompleted: text
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

        const house = { id: uuidv4(), ...payload };
        houseStorage.insert(house.id, house);
        return Ok(house);
    }),

    // update house with id
    updateHouse: update([text, HousePayload], Result(House, Message), (id, payload) => {
        const houseOpt = houseStorage.get(id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${id} not found` });
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

        const room = { id: uuidv4(), is_booked: false, ...payload };
        roomStorage.insert(room.id, room);
        return Ok(room);
    }),

    // update room with id
    updateRoom: update([text, RoomPayload], Result(Room, Message), (id, payload) => {
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

        const guest = { id: uuidv4(), ...payload };
        guestStorage.insert(guest.id, guest);
        return Ok(guest);
    }),

    // update guest with id
    updateGuest: update([text, GuestPayload], Result(Guest, Message), (id, payload) => {
        const guestOpt = guestStorage.get(id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${id} not found` });
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
        if (room.is_booked) {
            return Err({ InvalidPayload: `room with id=${payload.room_id} is already booked` });
        }

        const guestOpt = guestStorage.get(payload.guest_id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `guest with id=${payload.guest_id} not found` });
        }

        const guest = guestOpt.Some;

        const houseOpt = houseStorage.get(payload.house_id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${payload.house_id} not found` });
        }

        const house = houseOpt.Some;

        const reservation = { id: uuidv4(), ...payload };
        reservationStorage.insert(reservation.id, reservation);

        roomStorage.insert(room.id, { ...room, is_booked: true });
        return Ok(reservation);
    }),

    // update reservation with id
    updateReservation: update([text, ReservationPayload], Result(Reservation, Message), (id, payload) => {
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err({ NotFound: `reservation with id=${id} not found` });
        }

        const reservation = reservationOpt.Some;
        reservationStorage.insert(reservation.id, { ...reservation, ...payload });
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