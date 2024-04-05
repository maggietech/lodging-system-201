import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addGuest' : ActorMethod<[{ 'name' : string }], string>,
  'addHouse' : ActorMethod<[{ 'owner' : Principal, 'name' : string }], string>,
  'addRoom' : ActorMethod<
    [
      {
        'is_booked' : boolean,
        'house_id' : string,
        'room_number' : string,
        'price' : string,
      },
    ],
    string
  >,
  'createReservation' : ActorMethod<
    [
      {
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'guest_id' : string,
      },
    ],
    string
  >,
  'getGuest' : ActorMethod<
    [string],
    { 'Ok' : { 'id' : string, 'name' : string, 'created_date' : bigint } } |
      { 'Err' : { 'NotFound' : string } }
  >,
  'getHouse' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'updated_at' : [] | [bigint],
          'owner' : Principal,
          'name' : string,
          'created_date' : bigint,
        }
      } |
      { 'Err' : { 'NotFound' : string } }
  >,
  'getReservation' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'room_id' : string,
          'check_out_date' : string,
          'check_in_date' : string,
          'created_date' : bigint,
          'guest_id' : string,
        }
      } |
      { 'Err' : { 'NotFound' : string } }
  >,
  'getRoom' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'is_booked' : boolean,
          'updated_at' : [] | [bigint],
          'house_id' : string,
          'room_number' : string,
          'price' : string,
          'created_date' : bigint,
        }
      } |
      { 'Err' : { 'NotFound' : string } }
  >,
  'updateGuest' : ActorMethod<
    [{ 'id' : string, 'name' : string, 'created_date' : bigint }],
    string
  >,
  'updateHouse' : ActorMethod<
    [
      {
        'id' : string,
        'updated_at' : [] | [bigint],
        'owner' : Principal,
        'name' : string,
        'created_date' : bigint,
      },
    ],
    string
  >,
  'updateReservation' : ActorMethod<
    [
      {
        'id' : string,
        'room_id' : string,
        'check_out_date' : string,
        'check_in_date' : string,
        'created_date' : bigint,
        'guest_id' : string,
      },
    ],
    string
  >,
  'updateRoom' : ActorMethod<
    [
      {
        'id' : string,
        'is_booked' : boolean,
        'updated_at' : [] | [bigint],
        'house_id' : string,
        'room_number' : string,
        'price' : string,
        'created_date' : bigint,
      },
    ],
    string
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
