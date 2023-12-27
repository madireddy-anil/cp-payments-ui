import React from "react";
import { ProviderWrapper } from "state/contextProviders/ProviderWrapper";
import { Payments } from "./Client/Payments";

const WrappedPayments: React.FC = () => {
  return (
    <ProviderWrapper>
      <Payments />
    </ProviderWrapper>
  );
};

export default WrappedPayments;
