import React, { useContext, useLayoutEffect } from "react";
import { AuthContext, PortalEnum } from "@payconstruct/orbital-auth-provider";
import { Tabs as AllPayments } from "../Components/Tabs/Tabs";
import axiosMethods from "utils/ServerAPI";
import { PaymentsContext } from "../PaymentsContext/PaymentsProvider";
const { getCurrencies } = axiosMethods;
// interface PaymentsProps {
//   onNewBeneficiaryButtonClick?: () => void;
// }

export const Payments: React.FC = () => {
  const { dispatch } = useContext(PaymentsContext);
  const { portal, token } = useContext(AuthContext);

  useLayoutEffect(() => {
    getCurrencies(token ?? "", dispatch);
  }, []);

  return <>{portal === PortalEnum.CMS && <AllPayments />}</>;
};
