import React, { useContext } from "react";
import { AuthContext, PortalEnum } from "@payconstruct/orbital-auth-provider";
import { BeneficiaryDetails as BeneDetails } from "../Components/Beneficiaries/BeneficiaryDetails";

export const BeneficiaryDetails: React.FC = () => {
  const { portal } = useContext(AuthContext);
  return <>{portal === PortalEnum.CMS && <BeneDetails />}</>;
};
