import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import { Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal } from "azle/canisters/ledger";
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
    check_in_date: text,
    check_out_date: text,
    created_date: nat64,
});

const RoomPayload = Record({
    house_id: text,
    room_number: text,
    is_booked: bool,
    price: text,
});

const ReservationPayload = Record({
    room_id: text,
    guest_id: text,
    check_in_date: text,
    check_out_date: text,
});

const HousePayload = Record({
    name: text,
    owner: Principal
});

const GuestPayload = Record({
    name: text
});

const Message = Variant ({
    NotFound: text
})
// Create instances of StableBTreeMap for each entity type
const houseStorage = StableBTreeMap(0, text, House);
const roomStorage = StableBTreeMap(1, text, Room);
const guestStorage = StableBTreeMap(2, text, Guest);
const reservationStorage = StableBTreeMap(3, text, Reservation);

const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));
export default Canister({
 
    getHouse: query([text], Result(House, Message), (id) => {
        const houseOpt = houseStorage.get(id);
        if ("None" in houseOpt) {
            return Err({ NotFound: `house with id=${id} not found` });
        }
        return Ok(houseOpt.Some);
    }),

    getRoom: query([text], Result(Room, Message), (id) => {
        const roomOpt = roomStorage.get(id);
        if ("None" in roomOpt) {
            return Err({ NotFound: `Room with id=${id} not found` });
        }
        return Ok(roomOpt.Some);
    }),

    getGuest: query([text], Result(Guest, Message), (id) => {
        const guestOpt = guestStorage.get(id);
        if ("None" in guestOpt) {
            return Err({ NotFound: `Guest with id=${id} not found` });
        }
        return Ok(guestOpt.Some);
    }),

    getReservation: query([text], Result(Reservation, Message), (id) => {
        const reservationOpt = reservationStorage.get(id);
        if ("None" in reservationOpt) {
            return Err({ NotFound: `Reservation with id=${id} not found` });
        }
        return Ok(reservationOpt.Some);
    }),
    
    // Update functions
    addHouse: update([HousePayload], text, (payload) => {
        const { name, owner } = payload;
    
        const id = uuidv4(); // Generate a unique ID for the house
    
        const house = {
            id: id,
            name: name,
            owner: owner,
            created_date: ic.time(),
            updated_at: None
        };
        houseStorage.insert(id, house);
        return `House added successfully with ID ${id}`;
    }),

    addRoom: update([RoomPayload], text, (payload) => {
        const { house_id, room_number, is_booked, price } = payload;

        const id = uuidv4(); // Generate a unique ID for the room

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
        return `Room added successfully with ID ${id}`;
    }),

    addGuest: update([GuestPayload], text, (payload) => {
        const { name } = payload;

        const id = uuidv4(); // Generate a unique ID for the guest

        const guest = {
            id: id,
            name: name,
            created_date: ic.time()
        };
        guestStorage.insert(id, guest);
        return `Guest added successfully with ID ${id}`;
    }),

    createReservation: update([ReservationPayload], text, (payload) => {
        const { room_id, guest_id, check_in_date, check_out_date } = payload;

        const id = uuidv4(); // Generate a unique ID for the reservation

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

    updateHouse: update([House], text, (updatedHouse) => {
        const { id } = updatedHouse;
        const existingHouseOpt = houseStorage.get(id);
        if ("None" in existingHouseOpt) {
            return `House with ID ${id} not found`;
        }
        houseStorage.insert(id, updatedHouse);
        return `House with ID ${id} updated successfully`;
    }),

    updateRoom: update([Room], text, (updatedRoom) => {
        const { id } = updatedRoom;
        const existingRoomOpt = roomStorage.get(id);
        if ("None" in existingRoomOpt) {
            return `Room with ID ${id} not found`;
        }
        roomStorage.insert(id, updatedRoom);
        return `Room with ID ${id} updated successfully`;
    }),

    updateGuest: update([Guest], text, (updatedGuest) => {
        const { id } = updatedGuest;
        const existingGuestOpt = guestStorage.get(id);
        if ("None" in existingGuestOpt) {
            return `Guest with ID ${id} not found`;
        }
        guestStorage.insert(id, updatedGuest);
        return `Guest with ID ${id} updated successfully`;
    }),

    updateReservation: update([Reservation], text, (updatedReservation) => {
        const { id } = updatedReservation;
        const existingReservationOpt = reservationStorage.get(id);
        if ("None" in existingReservationOpt) {
            return `Reservation with ID ${id} not found`;
        }
        reservationStorage.insert(id, updatedReservation);
        return `Reservation with ID ${id} updated successfully`;
    })
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