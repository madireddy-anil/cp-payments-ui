import { gql } from "__generated__/gql";

export const removeBeneficiary = gql(`
mutation RemoveBeneficiary($beneficiary: InputID) {
    RemoveBeneficiary(beneficiary: $beneficiary) {
        EventId
    }
  }
`);
