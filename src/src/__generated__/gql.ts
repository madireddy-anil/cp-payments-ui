/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\nmutation RemoveBeneficiary($beneficiary: InputID) {\n    RemoveBeneficiary(beneficiary: $beneficiary) {\n        EventId\n    }\n  }\n":
    types.RemoveBeneficiaryDocument,
  "\n  query GetClientAccounts($productIds: [String]) {\n    GetClientAccounts(productIds: $productIds) {\n      accounts {\n        accountName\n        balance\n        currency\n        id\n      }\n    }\n  }\n":
    types.GetClientAccountsDocument,
  "\n  query GetBeneficiaries($limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    GetBeneficiaries(limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      count\n      nextToken\n      beneficiaries {\n        accountDetails {\n          iban\n          nameOnAccount\n          accountNumber\n        }\n        beneficiaryDetails {\n          nameOnAccount\n        }\n        id\n        currency\n        mainCurrency\n        status\n      }\n    }\n  }\n":
    types.GetBeneficiariesDocument,
  "\n  query BeneficiaryFullTextSearch($text: String!, $limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    BeneficiaryFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      accountDetails {\n        iban\n        accountNumber\n        nameOnAccount\n      }\n      beneficiaryDetails {\n        nameOnAccount\n      }\n      id\n      currency\n      mainCurrency\n      status\n    }\n  }\n":
    types.BeneficiaryFullTextSearchDocument,
  "\n  query GetBeneficiaryById($id: ID!) {\n    GetBeneficiaryById(id: $id) {\n        accountDetails {\n          accountNumber\n          bic\n          iban\n          branchCode\n          nameOnAccount\n          intermediaryBank\n        }\n        beneficiaryDetails {\n          nameOnAccount,\n          type\n          address {\n            country\n            buildingNumber\n            city\n            stateOrProvince\n            street\n            zipOrPostalCode\n          }\n        }\n        createdAt\n        mainCurrency\n        currency\n        id\n        status\n    }\n  }\n":
    types.GetBeneficiaryByIdDocument,
  "\n    query GetPayments($conversion: Boolean, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(conversion: $conversion, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n    }\n  }\n":
    types.GetPaymentsDocument,
  "\n    query PaymentsFullTextSearch($conversion: Boolean, $text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        PaymentsFullTextSearch(conversion: $conversion, text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency\n    }\n  }\n":
    types.PaymentsFullTextSearchDocument,
  "\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            creditorAgent {\n              creditorAgentId,\n              intermediaryBank\n            }\n            debtorAgent {\n              debtorAgentId\n            }\n            debtorAccountType   \n            isOutbound\n            processFlow\n            reference {\n              debtorCurrencyType\n            }\n            remittanceInformation\n            transactionReference\n            status\n    }\n  }\n":
    types.GetPaymentByIdDocument,
  "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n    }\n  }\n":
    types.OnQuotePriceReceivedDocument
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation RemoveBeneficiary($beneficiary: InputID) {\n    RemoveBeneficiary(beneficiary: $beneficiary) {\n        EventId\n    }\n  }\n"
): typeof documents["\nmutation RemoveBeneficiary($beneficiary: InputID) {\n    RemoveBeneficiary(beneficiary: $beneficiary) {\n        EventId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetClientAccounts($productIds: [String]) {\n    GetClientAccounts(productIds: $productIds) {\n      accounts {\n        accountName\n        balance\n        currency\n        id\n      }\n    }\n  }\n"
): typeof documents["\n  query GetClientAccounts($productIds: [String]) {\n    GetClientAccounts(productIds: $productIds) {\n      accounts {\n        accountName\n        balance\n        currency\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetBeneficiaries($limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    GetBeneficiaries(limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      count\n      nextToken\n      beneficiaries {\n        accountDetails {\n          iban\n          nameOnAccount\n          accountNumber\n        }\n        beneficiaryDetails {\n          nameOnAccount\n        }\n        id\n        currency\n        mainCurrency\n        status\n      }\n    }\n  }\n"
): typeof documents["\n  query GetBeneficiaries($limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    GetBeneficiaries(limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      count\n      nextToken\n      beneficiaries {\n        accountDetails {\n          iban\n          nameOnAccount\n          accountNumber\n        }\n        beneficiaryDetails {\n          nameOnAccount\n        }\n        id\n        currency\n        mainCurrency\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query BeneficiaryFullTextSearch($text: String!, $limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    BeneficiaryFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      accountDetails {\n        iban\n        accountNumber\n        nameOnAccount\n      }\n      beneficiaryDetails {\n        nameOnAccount\n      }\n      id\n      currency\n      mainCurrency\n      status\n    }\n  }\n"
): typeof documents["\n  query BeneficiaryFullTextSearch($text: String!, $limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {\n    BeneficiaryFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {\n      accountDetails {\n        iban\n        accountNumber\n        nameOnAccount\n      }\n      beneficiaryDetails {\n        nameOnAccount\n      }\n      id\n      currency\n      mainCurrency\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetBeneficiaryById($id: ID!) {\n    GetBeneficiaryById(id: $id) {\n        accountDetails {\n          accountNumber\n          bic\n          iban\n          branchCode\n          nameOnAccount\n          intermediaryBank\n        }\n        beneficiaryDetails {\n          nameOnAccount,\n          type\n          address {\n            country\n            buildingNumber\n            city\n            stateOrProvince\n            street\n            zipOrPostalCode\n          }\n        }\n        createdAt\n        mainCurrency\n        currency\n        id\n        status\n    }\n  }\n"
): typeof documents["\n  query GetBeneficiaryById($id: ID!) {\n    GetBeneficiaryById(id: $id) {\n        accountDetails {\n          accountNumber\n          bic\n          iban\n          branchCode\n          nameOnAccount\n          intermediaryBank\n        }\n        beneficiaryDetails {\n          nameOnAccount,\n          type\n          address {\n            country\n            buildingNumber\n            city\n            stateOrProvince\n            street\n            zipOrPostalCode\n          }\n        }\n        createdAt\n        mainCurrency\n        currency\n        id\n        status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n    query GetPayments($conversion: Boolean, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(conversion: $conversion, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n    }\n  }\n"
): typeof documents["\n    query GetPayments($conversion: Boolean, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(conversion: $conversion, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n    query PaymentsFullTextSearch($conversion: Boolean, $text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        PaymentsFullTextSearch(conversion: $conversion, text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency\n    }\n  }\n"
): typeof documents["\n    query PaymentsFullTextSearch($conversion: Boolean, $text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        PaymentsFullTextSearch(conversion: $conversion, text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            _id\n            createdAt\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            creditorAgent {\n              creditorAgentId,\n              intermediaryBank\n            }\n            debtorAgent {\n              debtorAgentId\n            }\n            debtorAccountType   \n            isOutbound\n            processFlow\n            reference {\n              debtorCurrencyType\n            }\n            remittanceInformation\n            transactionReference\n            status\n    }\n  }\n"
): typeof documents["\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            creditorAgent {\n              creditorAgentId,\n              intermediaryBank\n            }\n            debtorAgent {\n              debtorAgentId\n            }\n            debtorAccountType   \n            isOutbound\n            processFlow\n            reference {\n              debtorCurrencyType\n            }\n            remittanceInformation\n            transactionReference\n            status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n    }\n  }\n"
): typeof documents["\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
