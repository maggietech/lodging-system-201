import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'acceptLoanRequest' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'status' : { 'Active' : string } |
            { 'Defaulted' : string } |
            { 'Completed' : string },
          'duration' : bigint,
          'dueDate' : bigint,
          'borrower' : Principal,
          'creationDate' : bigint,
          'interestRate' : bigint,
          'lender' : [] | [Principal],
          'amount' : bigint,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'accumulateInterest' : ActorMethod<[], Array<string>>,
  'automateLoanRepayment' : ActorMethod<[], Array<string>>,
  'checkForDefault' : ActorMethod<[], Array<string>>,
  'createLoanRequest' : ActorMethod<
    [{ 'duration' : bigint, 'interestRate' : bigint, 'amount' : bigint }],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getLoanRequests' : ActorMethod<
    [],
    Array<{ 'duration' : bigint, 'interestRate' : bigint, 'amount' : bigint }>
  >,
  'getLoanStatus' : ActorMethod<
    [string],
    {
        'Ok' : { 'Active' : string } |
          { 'Defaulted' : string } |
          { 'Completed' : string }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getLoans' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'status' : { 'Active' : string } |
          { 'Defaulted' : string } |
          { 'Completed' : string },
        'duration' : bigint,
        'dueDate' : bigint,
        'borrower' : Principal,
        'creationDate' : bigint,
        'interestRate' : bigint,
        'lender' : [] | [Principal],
        'amount' : bigint,
      }
    >
  >,
  'getUserLoanHistory' : ActorMethod<
    [Principal],
    Array<
      {
        'id' : string,
        'status' : { 'Active' : string } |
          { 'Defaulted' : string } |
          { 'Completed' : string },
        'duration' : bigint,
        'dueDate' : bigint,
        'borrower' : Principal,
        'creationDate' : bigint,
        'interestRate' : bigint,
        'lender' : [] | [Principal],
        'amount' : bigint,
      }
    >
  >,
  'makeRepayment' : ActorMethod<
    [string, bigint],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'modifyLoanTerms' : ActorMethod<
    [
      string,
      { 'duration' : bigint, 'interestRate' : bigint, 'amount' : bigint },
    ],
    {
        'Ok' : {
          'id' : string,
          'status' : { 'Active' : string } |
            { 'Defaulted' : string } |
            { 'Completed' : string },
          'duration' : bigint,
          'dueDate' : bigint,
          'borrower' : Principal,
          'creationDate' : bigint,
          'interestRate' : bigint,
          'lender' : [] | [Principal],
          'amount' : bigint,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'registerUser' : ActorMethod<
    [string],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'requestLoanExtension' : ActorMethod<
    [string, bigint],
    {
        'Ok' : {
          'id' : string,
          'status' : { 'Active' : string } |
            { 'Defaulted' : string } |
            { 'Completed' : string },
          'duration' : bigint,
          'dueDate' : bigint,
          'borrower' : Principal,
          'creationDate' : bigint,
          'interestRate' : bigint,
          'lender' : [] | [Principal],
          'amount' : bigint,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'saveFunds' : ActorMethod<
    [bigint],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
