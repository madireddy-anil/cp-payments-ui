import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Button,
  Cards,
  Spacer,
  PageWrapper,
  PageHeader,
  HeaderContent,
  Spin
} from "@payconstruct/design-system";
import {
  PaymentFlowEnum,
  PaymentProcessFlowEnum,
  PaymentTypeEnum,
  ProvidedByEnum,
  TimeFormatEnum
} from "pages/Payments/enums";
import { Status } from "../../Status/Status";
import {
  currencyFormatter,
  formatDateAndTime,
  fractionFormat,
  getFormattedAddress,
  validateStrings
} from "utils/Transformer";
import { Payment } from "API";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { DownloadSummary } from "./DownloadSummary";
import { ApproversText } from "./ApproversText";
import { useQuery } from "@apollo/client";
import { getPaymentById } from "state/contextProviders/apollo/queries/Payments";

import Styles from "../Payments.module.css";
import { Currencies } from "pages/Payments/Payments.interface";

const PaymentDetails: React.FC = () => {
  const { id: paymentId } = useParams();
  const {
    state: { timeZone, currencies }
  } = useContext(PaymentsContext);

  const [empty] = useState<string>("--");
  const [downloadPDF, setDownloadPDF] = useState<boolean>(false);
  const [payment, setPayment] = useState<Payment>({});
  const {
    createdAt,
    isOutbound,
    processFlow,
    remittanceInformation,
    transactionReference,
    debitAmount,
    debitCurrency,
    debtorAccount,
    creditAmount,
    creditCurrency,
    creditorAccount,
    mainCreditCurrency,
    mainDebitCurrency,
    fee,
    reference,
    creditor,
    creditorAgent,
    status
  } = payment as Payment;
  const countryPartyName = isOutbound ? "Payment to" : "Payment from";
  const firstName = payment.created?.firstName;
  const lastName = payment.created?.firstName;

  const { loading: paymentLoading } = useQuery(getPaymentById, {
    variables: { id: paymentId ?? "" },
    onCompleted: (payment: { GetPaymentById: Payment }) => {
      setPayment(payment?.GetPaymentById ?? {});
    },
    fetchPolicy: "network-only"
  });

  const getDebitCurrencyDecimal = currencies.find(
    (currency: Currencies) => debitCurrency === currency?.code
  );
  const getCreditCurrencyDecimal = currencies.find(
    (currency: Currencies) => creditCurrency === currency?.code
  );

  // account details
  const accountDetails = {
    "Created on":
      formatDateAndTime(createdAt ?? "", timeZone, TimeFormatEnum.Format04) ??
      undefined,
    "Created by": validateStrings(firstName, lastName),
    "Remittance information": validateStrings(remittanceInformation),
    "Transaction reference": validateStrings(transactionReference),
    "Amount instructed": validateStrings(
      fractionFormat(
        debitAmount,
        parseInt(getDebitCurrencyDecimal?.decimals ?? "0")
      ),
      currencyFormatter(currencies, debitCurrency, mainDebitCurrency)
    ),
    "Amount sent": validateStrings(
      fractionFormat(
        creditAmount,
        parseInt(getCreditCurrencyDecimal?.decimals ?? "0")
      ),
      currencyFormatter(currencies, creditCurrency, mainCreditCurrency)
    ),
    Fees: validateStrings(fee?.liftingFeeAmount, fee?.liftingFeeCurrency),
    "Payment type": isOutbound ? "payment out" : "payment in"
  };

  // payment details
  const paymentDetails = {
    "Account number": validateStrings(debtorAccount),
    "Account name": debitCurrency ? `${debitCurrency} Account` : undefined,
    "Provided by":
      reference?.debtorCurrencyType === "fiat"
        ? ProvidedByEnum.PayPerformLtd
        : ProvidedByEnum.PayPerformOU
  };

  // beneficiary details
  const beneDetails = {
    Name: validateStrings(creditor?.creditorName),
    Address: getFormattedAddress(creditor?.creditorAddress ?? {}),
    Account: validateStrings(creditorAccount),
    "Bank code / BIC": creditorAgent?.creditorAgentId,
    "Intermediary Bank": creditorAgent?.intermediaryBank
  };

  const validateToHide = (
    hasValueExist: string | undefined,
    hasRequiredToHide: string | boolean
  ) => {
    return !hasValueExist || hasRequiredToHide ? true : false;
  };

  return (
    <PageWrapper>
      <Spin loading={paymentLoading}>
        <PageHeader>
          <HeaderContent.LeftSide>
            <Text size="xxlarge" weight="bold" style={{ lineHeight: "120%" }}>
              {countryPartyName} {creditor?.creditorName}
            </Text>
          </HeaderContent.LeftSide>
          <HeaderContent.RightSide>
            <Button
              type="link"
              icon={{ name: "download" }}
              label="Download confirmation"
              style={{ width: "170px" }}
              onClick={() => setDownloadPDF(true)}
              size="large"
            />
          </HeaderContent.RightSide>
        </PageHeader>

        <div className={Styles["pay_subHeader"]}>
          <PageHeader>
            <HeaderContent.LeftSide>
              <ApproversText status="" />
            </HeaderContent.LeftSide>
            <HeaderContent.RightSide>
              <Status size="small" status={status ?? "pending"} />
            </HeaderContent.RightSide>
          </PageHeader>
        </div>

        <Cards.SummaryCard
          key="1"
          style={{ borderRadius: "10px" }}
          columns={12}
          title="Payment Details"
          showCopyIcon
          summaryList={[
            {
              label: "Created on",
              value: accountDetails["Created on"]
            },
            {
              label: "Created by",
              value: accountDetails["Created by"],
              hidden: !isOutbound || !firstName || !lastName
            },
            {
              label: "Remittance information",
              value: accountDetails["Remittance information"],
              hidden: !remittanceInformation
            },
            {
              label: "Transaction reference",
              value: accountDetails["Transaction reference"]
            },
            {
              label: "Amount instructed",
              value: accountDetails["Amount instructed"],
              hidden: accountDetails["Amount instructed"] === "0"
            },
            {
              label: isOutbound ? "Amount to be received" : "Amount received",
              value: accountDetails["Amount sent"],
              hidden: accountDetails["Amount sent"] === "0"
            },
            {
              label: "Fees",
              value: accountDetails.Fees,
              hidden: !accountDetails.Fees
            },
            {
              label: "Payment type",
              value: isOutbound ? PaymentTypeEnum.Out : PaymentTypeEnum.In
            }
          ]}
        />
        <Spacer size={20} />
        <Cards.SummaryCard
          key="2"
          style={{ borderRadius: "10px" }}
          columns={12}
          title="Payment account details"
          showCopyIcon
          summaryList={[
            {
              label:
                processFlow === PaymentProcessFlowEnum.FiatToFiat
                  ? "Account number"
                  : "Wallet address",
              value: paymentDetails["Account number"],
              hidden: !paymentDetails["Account number"]
            },
            {
              label: "Account name",
              value: paymentDetails["Account name"],
              hidden: !paymentDetails["Account name"]
            },
            {
              label: "Provided by",
              value: paymentDetails["Provided by"],
              hidden: !paymentDetails["Provided by"]
            }
          ]}
        />
        <Spacer size={20} />
        <Cards.SummaryCard
          key="3"
          style={{ borderRadius: "10px" }}
          columns={12}
          title="Counterparty details"
          showCopyIcon
          summaryList={[
            {
              label: "Name",
              value: beneDetails?.Name ?? empty,
              hidden: !beneDetails?.Name
            },
            {
              label: "Address",
              value: beneDetails?.Address ?? empty,
              hidden: validateToHide(
                beneDetails?.Address,
                processFlow === PaymentProcessFlowEnum.CryptoToCrypto
              )
            },
            {
              label:
                payment?.reference?.debtorCurrencyType ===
                PaymentFlowEnum.Crypto
                  ? "Wallet address"
                  : "Account",
              value: beneDetails?.Account ?? empty
            },
            {
              label: "Bank code / BIC",
              value: beneDetails["Bank code / BIC"],
              hidden: validateToHide(
                beneDetails["Bank code / BIC"],
                payment?.reference?.debtorCurrencyType ===
                  PaymentFlowEnum.Crypto
              )
            },
            {
              label: "Intermediary Bank",
              value: beneDetails["Intermediary Bank"],
              hidden: validateToHide(
                beneDetails["Intermediary Bank"],
                !payment?.creditorAgent?.intermediaryBank
              )
            }
          ]}
        />
        <Spacer size={40} />
      </Spin>
      <DownloadSummary
        payment={{
          accountDetails: accountDetails,
          paymentDetails: paymentDetails,
          beneDetails: beneDetails
        }}
        paymentDetail={payment}
        download={downloadPDF}
        callback={() => {
          setDownloadPDF(false);
        }}
      />
    </PageWrapper>
  );
};

export { PaymentDetails };
