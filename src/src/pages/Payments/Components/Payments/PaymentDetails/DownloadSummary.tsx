import React from "react";
import moment from "moment";
import DownloadPDF from "components/PDFDownloader/PDFDownloader";
import {
  IssuerEntityIdsEnum,
  PaymentProcessFlowEnum
} from "pages/Payments/enums";
import { Payment } from "API";
interface StatusProps {
  download: boolean;
  payment: {
    accountDetails: { [key: string]: string | undefined };
    paymentDetails: { [key: string]: string | undefined };
    beneDetails: { [key: string]: string | undefined };
  };
  paymentDetail: Payment;
  callback: (v: boolean) => void;
}

const DownloadSummary: React.FC<StatusProps> = ({
  download,
  callback,
  payment = {
    accountDetails: {},
    paymentDetails: {},
    beneDetails: {}
  },
  paymentDetail
}) => {
  const processFlow = paymentDetail?.processFlow ?? undefined;
  const isOutbound = paymentDetail?.isOutbound ?? undefined;

  const getAccountDetails = () => {
    const details = payment.accountDetails;
    if (!isOutbound) {
      delete details["Created by"];
    }
    return details;
  };

  const getBeneDetails = () => {
    const details = payment.beneDetails;
    if (processFlow === PaymentProcessFlowEnum.CryptoToCrypto) {
      delete details["Address"];
      delete details["Bank code / BIC"];
    }
    return details;
  };

  const getPaymentAccDetails = () => {
    const details = payment.paymentDetails;
    if (processFlow === PaymentProcessFlowEnum.CryptoToCrypto) {
      details["Wallet address"] = payment.paymentDetails["Account number"];
      delete details["Account number"];
    }
    return details;
  };

  return (
    <DownloadPDF
      issuerEntity={
        processFlow === PaymentProcessFlowEnum.CryptoToCrypto
          ? IssuerEntityIdsEnum.PayPerformOU
          : IssuerEntityIdsEnum.PayPerformLtd
      }
      summary={[
        {
          title: "Account Details",
          details: getAccountDetails()
        },
        {
          title: "Payment account details",
          details: getPaymentAccDetails()
        },
        {
          title: "Beneficiary details",
          details: getBeneDetails()
        }
      ]}
      startDownload={download}
      onCompleteDownload={() => {
        callback(false);
      }}
      fileName={`Payment-summary ${moment().format("YYYY-MM-DD HH:mm:ss a")}`}
    />
  );
};

export { DownloadSummary };
