import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createReservation' : ActorMethod<
    [string, string, string, bigint, bigint],
    string
  >,
  'getHouseDetails' : ActorMethod<
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
      { 'Err' : string }
  >,
  'getPaymentDetails' : ActorMethod<
    [string],
    { 'Ok' : { 'msg' : string, 'amount' : bigint } } |
      { 'Err' : string }
  >,
  'getReservationDetails' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'room_id' : string,
          'check_out_date' : bigint,
          'check_in_date' : bigint,
          'created_date' : bigint,
          'guest_id' : string,
        }
      } |
      { 'Err' : string }
  >,
  'getRoomDetails' : ActorMethod<
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
      { 'Err' : string }
  >,
  'processPayment' : ActorMethod<
    [string, string, string],
    { 'Ok' : string } |
      { 'Err' : string }
  >,
  'registerGuest' : ActorMethod<[string, string], string>,
  'registerHouse' : ActorMethod<[string, string, Principal], string>,
  'registerRoom' : ActorMethod<
    [string, string, string, boolean, string],
    string
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
