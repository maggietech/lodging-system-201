export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createReservation' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat64, IDL.Nat64],
        [IDL.Text],
        [],
      ),
    'getHouseDetails' : IDL.Func(
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
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getPaymentDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({ 'msg' : IDL.Text, 'amount' : IDL.Nat64 }),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getReservationDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Nat64,
              'check_in_date' : IDL.Nat64,
              'created_date' : IDL.Nat64,
              'guest_id' : IDL.Text,
            }),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getRoomDetails' : IDL.Func(
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
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'processPayment' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'registerGuest' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'registerHouse' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Principal],
        [IDL.Text],
        [],
      ),
    'registerRoom' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Bool, IDL.Text],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
