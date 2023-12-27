import { gql } from "__generated__/gql";

export const getPayments = gql(`
    query GetPayments($conversion: Boolean, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {
        GetPayments(conversion: $conversion, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {
            _id
            createdAt
            creditAmount
            creditor {
                creditorName
            }
            isOutbound
            status
            transactionReference
            creditCurrency
            mainCreditCurrency
    }
  }
`);

export const paymentsFullTextSearch = gql(`
    query PaymentsFullTextSearch($conversion: Boolean, $text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {
        PaymentsFullTextSearch(conversion: $conversion, text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {
            _id
            createdAt
            creditAmount
            creditor {
                creditorName
            }
            isOutbound
            status
            transactionReference
            creditCurrency,
            mainCreditCurrency
    }
  }
`);

export const getPaymentById = gql(`
    query GetPaymentById($id: String!) {
        GetPaymentById(id: $id) {
            _id
            createdAt
            creditAmount
            creditCurrency
            creditorAccount
            debtorAccount
            debitAmount
            debitCurrency
            mainCreditCurrency
            mainDebitCurrency
            created {
              firstName
              lastName
            }
            creditor {
              creditorName
            }
            creditorAgent {
              creditorAgentId,
              intermediaryBank
            }
            debtorAgent {
              debtorAgentId
            }
            debtorAccountType   
            isOutbound
            processFlow
            reference {
              debtorCurrencyType
            }
            remittanceInformation
            transactionReference
            status
    }
  }
`);
