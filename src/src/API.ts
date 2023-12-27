/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { type } from "os";
export type UserInput = {
  email: string;
  id: string;
  name: string;
  orgId: string;
};
export type User = {
  __typename: "User";
  email: string;
  id: string;
  name: string;
  orgId: string;
  organization?: Organization | null;
};
export type Organization = {
  __typename: "Organization";
  address: string;
  city: string;
  id: string;
  name: string;
  postCode?: string | null;
};
export type CreateUserMutationVariables = {
  user: UserInput;
};
export type CreateUserMutation = {
  createUser?: {
    __typename: "User";
    email: string;
    id: string;
    name: string;
    orgId: string;
    organization?: {
      __typename: "Organization";
      address: string;
      city: string;
      id: string;
      name: string;
      postCode?: string | null;
    } | null;
  } | null;
};
export type UpdateUserMutationVariables = {
  user: UserInput;
};
export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User";
    email: string;
    id: string;
    name: string;
    orgId: string;
    organization?: {
      __typename: "Organization";
      address: string;
      city: string;
      id: string;
      name: string;
      postCode?: string | null;
    } | null;
  } | null;
};
export type GetOrgByIdQueryVariables = {
  orgId: string;
};
export type GetOrgByIdQuery = {
  getOrgById?: {
    __typename: "Organization";
    address: string;
    city: string;
    id: string;
    name: string;
    postCode?: string | null;
  } | null;
};
export type GetUserByIdQueryVariables = {
  userId: string;
};
export type GetUserByIdQuery = {
  getUserById?: {
    __typename: "User";
    email: string;
    id: string;
    name: string;
    orgId: string;
    organization?: {
      __typename: "Organization";
      address: string;
      city: string;
      id: string;
      name: string;
      postCode?: string | null;
    } | null;
  } | null;
};
export type BeneficiariesState = {
  id?: string;
  accountNumber?: string;
  country?: string;
  currency?: string;
  limit?: number;
  nameOnAccount?: string;
  nextToken?: string;
  status?: string;
  mainCurrency?: string;
  accountDetails?: {
    nameOnAccount?: string;
  };
};
export type BeneficiaryResponse = {
  __typename?: "beneficiaryResponse";
  beneficiaries?: Array<Beneficiary>;
  count?: number;
  nextToken?: string;
};
export type Beneficiary = {
  __typename?: "Beneficiary";
  createdAt?: Scalars["String"];
  accountDetails?: AccountDetails;
  beneficiaryDetails?: BeneficiaryDetails;
  currency?: string;
  id?: string;
  status?: string;
  mainCurrency?: Scalars["String"];
};
export type AccountDetails = {
  __typename?: "AccountDetails";
  accountNumber: string;
  bic?: string;
  iban?: string;
  nameOnAccount?: string;
  intermediaryBank?: string;
};
export type BeneficiaryDetails = {
  __typename?: "BeneficiaryDetails";
  address?: Address;
  nameOnAccount?: string;
  type?: string;
};
export type Address = {
  __typename?: "Address";
  buildingNumber?: string;
  city?: string;
  country?: string;
  stateOrProvince?: string;
  street?: string;
  zipOrPostalCode?: string;
};

// GraphQl api types
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDateTime: any;
};
export type APayments = {
  __typename?: "Get all payments";
  GetPayments?: Array<Payment>;
};
export type Created = {
  __typename?: "Created";
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  source: Scalars["String"];
  userId: Scalars["String"];
};
export type PaymentFee = {
  __typename?: "PaymentFee";
  actualLiftingFee: Scalars["Float"];
  liftingFeeAmount: Scalars["Float"];
  liftingFeeCurrency: Scalars["String"];
  liftingFeeMethod: Scalars["String"];
  pricingProfileId: Scalars["String"];
};
export type Payment = {
  __typename?: "Payment";
  _id?: Scalars["ID"];
  accountBalanceId?: Scalars["String"];
  accountId?: Scalars["String"];
  chargeBearer?: Scalars["String"];
  created?: Created;
  createdAt?: Scalars["AWSDateTime"];
  createdBy?: Scalars["String"];
  creditAmount?: Scalars["Float"];
  creditCurrency?: Scalars["String"];
  creditor?: Creditor;
  creditorAccount?: Scalars["String"];
  creditorAccountType?: Scalars["String"];
  creditorAgent?: CreditorAgent;
  debitAmount?: Scalars["Float"];
  debitCurrency?: Scalars["String"];
  debtorAccount?: Scalars["String"];
  debtorAccountType?: Scalars["String"];
  debtorAgent?: DebtorAgent;
  endToEndReference?: Scalars["String"];
  fee?: PaymentFee;
  instructionPriority?: Scalars["String"];
  instructionReceivedDate?: Scalars["AWSDateTime"];
  instructionReference?: Scalars["String"];
  isOutbound?: Scalars["Boolean"];
  isReturn?: Scalars["Boolean"];
  isTreasury?: Scalars["Boolean"];
  messageState?: Scalars["String"];
  messageType?: Scalars["String"];
  originalInstructedAmount?: Scalars["Float"];
  ownerEntityId?: Scalars["String"];
  processFlow?: Scalars["String"];
  reference?: Reference;
  remittanceInformation?: Scalars["String"];
  requestedValueDate?: Scalars["String"];
  settlementChannel?: Scalars["String"];
  status?: Scalars["String"];
  transactionReference?: Scalars["String"];
  uetr?: Scalars["String"];
  updatedAt?: Scalars["AWSDateTime"];
  valueDate?: Scalars["AWSDateTime"];
  vendorAccountId?: Scalars["String"];
  vendorBalanceId?: Scalars["String"];
  mainCreditCurrency?: Scalars["String"];
  mainDebitCurrency?: Scalars["String"];
};
export type Creditor = {
  __typename?: "Creditor";
  creditorAddress: CreditorAddress;
  creditorName: Scalars["String"];
};
export type CreditorAddress = {
  __typename?: "CreditorAddress";
  buildingNumber: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  postalCode: Scalars["String"];
  state: Scalars["String"];
  street: Scalars["String"];
};
export type CreditorAgent = {
  __typename?: "CreditorAgent";
  creditorAgentId: Scalars["String"];
  intermediaryBank: Scalars["String"];
};
export type DebtorAgent = {
  __typename?: "DebtorAgent";
  debtorAgentId: Scalars["String"];
};
export type Reference = {
  __typename?: "Reference";
  debtorCurrencyType?: Scalars["String"];
  settlementVendorId?: Scalars["ID"];
};
