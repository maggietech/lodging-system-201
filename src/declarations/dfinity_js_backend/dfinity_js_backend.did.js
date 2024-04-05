export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addGuest' : IDL.Func([IDL.Record({ 'name' : IDL.Text })], [IDL.Text], []),
    'addHouse' : IDL.Func(
        [IDL.Record({ 'owner' : IDL.Principal, 'name' : IDL.Text })],
        [IDL.Text],
        [],
      ),
    'addRoom' : IDL.Func(
        [
          IDL.Record({
            'is_booked' : IDL.Bool,
            'house_id' : IDL.Text,
            'room_number' : IDL.Text,
            'price' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'createReservation' : IDL.Func(
        [
          IDL.Record({
            'room_id' : IDL.Text,
            'check_out_date' : IDL.Text,
            'check_in_date' : IDL.Text,
            'guest_id' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'getGuest' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({ 'NotFound' : IDL.Text }),
          }),
        ],
        ['query'],
      ),
    'getHouse' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'updated_at' : IDL.Opt(IDL.Nat64),
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({ 'NotFound' : IDL.Text }),
          }),
        ],
        ['query'],
      ),
    'getReservation' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'created_date' : IDL.Nat64,
              'guest_id' : IDL.Text,
            }),
            'Err' : IDL.Variant({ 'NotFound' : IDL.Text }),
          }),
        ],
        ['query'],
      ),
    'getRoom' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'is_booked' : IDL.Bool,
              'updated_at' : IDL.Opt(IDL.Nat64),
              'house_id' : IDL.Text,
              'room_number' : IDL.Text,
              'price' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({ 'NotFound' : IDL.Text }),
          }),
        ],
        ['query'],
      ),
    'updateGuest' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Text,
            'name' : IDL.Text,
            'created_date' : IDL.Nat64,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'updateHouse' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Text,
            'updated_at' : IDL.Opt(IDL.Nat64),
            'owner' : IDL.Principal,
            'name' : IDL.Text,
            'created_date' : IDL.Nat64,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'updateReservation' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Text,
            'room_id' : IDL.Text,
            'check_out_date' : IDL.Text,
            'check_in_date' : IDL.Text,
            'created_date' : IDL.Nat64,
            'guest_id' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'updateRoom' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Text,
            'is_booked' : IDL.Bool,
            'updated_at' : IDL.Opt(IDL.Nat64),
            'house_id' : IDL.Text,
            'room_number' : IDL.Text,
            'price' : IDL.Text,
            'created_date' : IDL.Nat64,
          }),
        ],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
