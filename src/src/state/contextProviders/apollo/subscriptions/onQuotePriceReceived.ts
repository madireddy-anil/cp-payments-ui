import { gql } from "__generated__/gql";

export const onQuotePriceReceived = gql(/* GraphQL */ `
  subscription OnQuotePriceReceived {
    OnQuotePriceReceived {
      fee
      sourceAmount
      destinationAmount
    }
  }
`);
