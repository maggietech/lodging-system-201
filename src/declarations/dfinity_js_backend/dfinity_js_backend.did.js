export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createGuest' : IDL.Func(
        [
          IDL.Record({
            'name' : IDL.Text,
            'email' : IDL.Text,
            'phone' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'createHouse' : IDL.Func(
        [
          IDL.Record({
            'name' : IDL.Text,
            'description' : IDL.Text,
            'address' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'address' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'createReservation' : IDL.Func(
        [
          IDL.Record({
            'room_id' : IDL.Text,
            'check_out_date' : IDL.Text,
            'check_in_date' : IDL.Text,
            'house_id' : IDL.Text,
            'guest_id' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'createRoom' : IDL.Func(
        [
          IDL.Record({
            'price_per_night' : IDL.Text,
            'house_id' : IDL.Text,
            'room_number' : IDL.Text,
            'capacity' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'is_booked' : IDL.Bool,
              'price_per_night' : IDL.Text,
              'house_id' : IDL.Text,
              'room_number' : IDL.Text,
              'capacity' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'getGuest' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getGuests' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getHouse' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'address' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getHouses' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'address' : IDL.Text,
            })
          ),
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
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getReservations' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByCheckInDate' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByCheckOutDate' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByGuestId' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByHouseId' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByHouseIdAndCheckInDate' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByHouseIdAndCheckOutDate' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getReservationsByRoomId' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            })
          ),
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
              'price_per_night' : IDL.Text,
              'house_id' : IDL.Text,
              'room_number' : IDL.Text,
              'capacity' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getRooms' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'is_booked' : IDL.Bool,
              'price_per_night' : IDL.Text,
              'house_id' : IDL.Text,
              'room_number' : IDL.Text,
              'capacity' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'searchHouse' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'address' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'updateGuest' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'name' : IDL.Text,
            'email' : IDL.Text,
            'phone' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'updateHouse' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'name' : IDL.Text,
            'description' : IDL.Text,
            'address' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'address' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'updateReservation' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'room_id' : IDL.Text,
            'check_out_date' : IDL.Text,
            'check_in_date' : IDL.Text,
            'house_id' : IDL.Text,
            'guest_id' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'room_id' : IDL.Text,
              'check_out_date' : IDL.Text,
              'check_in_date' : IDL.Text,
              'house_id' : IDL.Text,
              'guest_id' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'updateRoom' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'price_per_night' : IDL.Text,
            'house_id' : IDL.Text,
            'room_number' : IDL.Text,
            'capacity' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'is_booked' : IDL.Bool,
              'price_per_night' : IDL.Text,
              'house_id' : IDL.Text,
              'room_number' : IDL.Text,
              'capacity' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
