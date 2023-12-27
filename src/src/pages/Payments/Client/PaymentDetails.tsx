import React, { useContext } from "react";
import { AuthContext, PortalEnum } from "@payconstruct/orbital-auth-provider";
import { PaymentDetails as PaymentHistory } from "../Components/Payments/PaymentDetails";

export const PaymentDetails: React.FC = () => {
  const { portal } = useContext(AuthContext);
  return <>{portal === PortalEnum.CMS && <PaymentHistory />}</>;
};
