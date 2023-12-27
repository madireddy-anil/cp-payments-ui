import { gql } from "__generated__/gql";

export const getClientAccounts = gql(`
  query GetClientAccounts($productIds: [String]) {
    GetClientAccounts(productIds: $productIds) {
      accounts {
        accountName
        balance
        currency
        id
      }
    }
  }
`);
