import { gql } from "__generated__/gql";

export const getBeneficiaries = gql(`
  query GetBeneficiaries($limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {
    GetBeneficiaries(limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {
      count
      nextToken
      beneficiaries {
        accountDetails {
          iban
          nameOnAccount
          accountNumber
        }
        beneficiaryDetails {
          nameOnAccount
        }
        id
        currency
        mainCurrency
        status
      }
    }
  }
`);

export const beneficiaryFullTextSearch = gql(`
  query BeneficiaryFullTextSearch($text: String!, $limit: Int, $nextToken: String, $currency: [String], $status: [String], $country: String, $accountNumber: String) {
    BeneficiaryFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, currency: $currency, status: $status, country: $country, accountNumber: $accountNumber) {
      accountDetails {
        iban
        accountNumber
        nameOnAccount
      }
      beneficiaryDetails {
        nameOnAccount
      }
      id
      currency
      mainCurrency
      status
    }
  }
`);

export const getBeneficiaryById = gql(`
  query GetBeneficiaryById($id: ID!) {
    GetBeneficiaryById(id: $id) {
        accountDetails {
          accountNumber
          bic
          iban
          branchCode
          nameOnAccount
          intermediaryBank
        }
        beneficiaryDetails {
          nameOnAccount,
          type
          address {
            country
            buildingNumber
            city
            stateOrProvince
            street
            zipOrPostalCode
          }
        }
        createdAt
        mainCurrency
        currency
        id
        status
    }
  }
`);
