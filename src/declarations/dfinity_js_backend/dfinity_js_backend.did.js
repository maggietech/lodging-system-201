export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'acceptLoanRequest' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Variant({
                'Active' : IDL.Text,
                'Defaulted' : IDL.Text,
                'Completed' : IDL.Text,
              }),
              'duration' : IDL.Nat64,
              'dueDate' : IDL.Nat64,
              'borrower' : IDL.Principal,
              'creationDate' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'lender' : IDL.Opt(IDL.Principal),
              'amount' : IDL.Nat64,
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
    'accumulateInterest' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'automateLoanRepayment' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'checkForDefault' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'createLoanRequest' : IDL.Func(
        [
          IDL.Record({
            'duration' : IDL.Nat64,
            'interestRate' : IDL.Nat64,
            'amount' : IDL.Nat64,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
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
    'getLoanRequests' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'duration' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'amount' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'getLoanStatus' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Variant({
              'Active' : IDL.Text,
              'Defaulted' : IDL.Text,
              'Completed' : IDL.Text,
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
    'getLoans' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Variant({
                'Active' : IDL.Text,
                'Defaulted' : IDL.Text,
                'Completed' : IDL.Text,
              }),
              'duration' : IDL.Nat64,
              'dueDate' : IDL.Nat64,
              'borrower' : IDL.Principal,
              'creationDate' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'lender' : IDL.Opt(IDL.Principal),
              'amount' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'getUserLoanHistory' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Variant({
                'Active' : IDL.Text,
                'Defaulted' : IDL.Text,
                'Completed' : IDL.Text,
              }),
              'duration' : IDL.Nat64,
              'dueDate' : IDL.Nat64,
              'borrower' : IDL.Principal,
              'creationDate' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'lender' : IDL.Opt(IDL.Principal),
              'amount' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'makeRepayment' : IDL.Func(
        [IDL.Text, IDL.Nat64],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
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
    'modifyLoanTerms' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'duration' : IDL.Nat64,
            'interestRate' : IDL.Nat64,
            'amount' : IDL.Nat64,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Variant({
                'Active' : IDL.Text,
                'Defaulted' : IDL.Text,
                'Completed' : IDL.Text,
              }),
              'duration' : IDL.Nat64,
              'dueDate' : IDL.Nat64,
              'borrower' : IDL.Principal,
              'creationDate' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'lender' : IDL.Opt(IDL.Principal),
              'amount' : IDL.Nat64,
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
    'registerUser' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
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
    'requestLoanExtension' : IDL.Func(
        [IDL.Text, IDL.Nat64],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Variant({
                'Active' : IDL.Text,
                'Defaulted' : IDL.Text,
                'Completed' : IDL.Text,
              }),
              'duration' : IDL.Nat64,
              'dueDate' : IDL.Nat64,
              'borrower' : IDL.Principal,
              'creationDate' : IDL.Nat64,
              'interestRate' : IDL.Nat64,
              'lender' : IDL.Opt(IDL.Principal),
              'amount' : IDL.Nat64,
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
    'saveFunds' : IDL.Func(
        [IDL.Nat64],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
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
