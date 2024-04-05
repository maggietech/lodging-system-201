import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createGuest' : ActorMethod<
    [{ 'name' : string, 'email' : string, 'phone' : string }],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'email' : string,
          'phone' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'createHouse' : ActorMethod<
    [{ 'name' : string, 'description' : string, 'address' : string }],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'description' : string,
          'address' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'createReservation' : ActorMethod<
    [
      {
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'room_id' : string,
          'check_out_date' : string,
          'check_in_date' : string,
          'house_id' : string,
          'guest_id' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'createRoom' : ActorMethod<
    [
      {
        'price_per_night' : string,
        'house_id' : string,
        'room_number' : string,
        'capacity' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'is_booked' : boolean,
          'price_per_night' : string,
          'house_id' : string,
          'room_number' : string,
          'capacity' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getGuest' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'email' : string,
          'phone' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getGuests' : ActorMethod<
    [],
    Array<
      { 'id' : string, 'name' : string, 'email' : string, 'phone' : string }
    >
  >,
  'getHouse' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'description' : string,
          'address' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getHouses' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'name' : string,
        'description' : string,
        'address' : string,
      }
    >
  >,
  'getReservation' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'room_id' : string,
          'check_out_date' : string,
          'check_in_date' : string,
          'house_id' : string,
          'guest_id' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getReservations' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByCheckInDate' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByCheckOutDate' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByGuestId' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByHouseId' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByHouseIdAndCheckInDate' : ActorMethod<
    [string, string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByHouseIdAndCheckOutDate' : ActorMethod<
    [string, string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getReservationsByRoomId' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      }
    >
  >,
  'getRoom' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'is_booked' : boolean,
          'price_per_night' : string,
          'house_id' : string,
          'room_number' : string,
          'capacity' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getRooms' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'is_booked' : boolean,
        'price_per_night' : string,
        'house_id' : string,
        'room_number' : string,
        'capacity' : string,
      }
    >
  >,
  'searchHouse' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'name' : string,
        'description' : string,
        'address' : string,
      }
    >
  >,
  'updateGuest' : ActorMethod<
    [string, { 'name' : string, 'email' : string, 'phone' : string }],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'email' : string,
          'phone' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'updateHouse' : ActorMethod<
    [string, { 'name' : string, 'description' : string, 'address' : string }],
    {
        'Ok' : {
          'id' : string,
          'name' : string,
          'description' : string,
          'address' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'updateReservation' : ActorMethod<
    [
      string,
      {
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'house_id' : string,
        'guest_id' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'room_id' : string,
          'check_out_date' : string,
          'check_in_date' : string,
          'house_id' : string,
          'guest_id' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'updateRoom' : ActorMethod<
    [
      string,
      {
        'price_per_night' : string,
        'house_id' : string,
        'room_number' : string,
        'capacity' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'is_booked' : boolean,
          'price_per_night' : string,
          'house_id' : string,
          'room_number' : string,
          'capacity' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
