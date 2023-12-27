import React, { useContext, useState } from "react";
import { getName } from "country-list";
import { useNavigate, useParams } from "react-router-dom";
import {
  Text,
  Button,
  Cards,
  PageWrapper,
  PageHeader,
  HeaderContent,
  Spin,
  CurrencyTag
} from "@payconstruct/design-system";
import { useQuery } from "@apollo/client";
import { getBeneficiaryById } from "state/contextProviders/apollo/queries/Beneficiary";
import { Status } from "../Status/Status";
import {
  capitalize,
  formatDateAndTime,
  isCurrencyPresent,
  getFormattedAddress,
  validateStrings,
  currencyFormatter
} from "utils/Transformer";
import { Beneficiary } from "API";
import { TimeFormatEnum } from "pages/Payments/enums";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { DeleteBeneficiary } from "./DeleteBeneficiary/DeleteBeneficiary";
import { cryptoCurrencies } from "config/variables";
import Styles from "./Beneficiaries.module.css";

const BeneficiaryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id: beneficiaryId } = useParams();
  const {
    state: { currencies, timeZone }
  } = useContext(PaymentsContext);

  const [empty] = useState<string>("--");
  const [showDeleteBeneModal, setShowDeleteBeneModal] =
    useState<boolean>(false);
  const [selectedBene, setSelectedBene] = useState<{
    beneId: string | undefined;
    beneName: string | undefined;
  }>({ beneId: "", beneName: "" });
  const [beneficiary, setBeneficiary] = useState<Beneficiary>({});

  const {
    createdAt,
    mainCurrency,
    accountDetails,
    beneficiaryDetails,
    status,
    currency
  } = beneficiary as Beneficiary;
  const accountNumber = accountDetails?.accountNumber;
  const nameOnAccount = accountDetails?.nameOnAccount;
  const iban = accountDetails?.iban;
  const bic = accountDetails?.bic;
  const address = beneficiaryDetails?.address;
  const beneName = beneficiaryDetails?.nameOnAccount;
  const type = beneficiaryDetails?.type;
  const intermediaryBank = accountDetails?.intermediaryBank;

  const { loading } = useQuery(getBeneficiaryById, {
    variables: {
      id: beneficiaryId ?? ""
    },
    onCompleted: (Bene: { GetBeneficiaryById: Beneficiary }) => {
      setBeneficiary(Bene?.GetBeneficiaryById ?? {});
    }
  });

  const getBlockchainName = (mainCurrency: string | undefined) => {
    switch (mainCurrency) {
      case "ETH":
        return "Ethereum";
      case "TRX":
        return "Tron";
      default:
        return empty;
    }
  };

  const getBeneDetails = () => {
    return [
      {
        label: "Beneficiary Bank Country",
        value: getName(address?.country ?? empty) ?? empty,
        hidden: !address?.country
      },
      {
        label: "Registered Address",
        value: getFormattedAddress(address ?? {}) ?? empty,
        hidden: !getFormattedAddress(address ?? {})
      }
    ];
  };

  const getAccountDetails = () => {
    return [
      {
        label: "Currency",
        value: currencyFormatter(
          currencies,
          validateStrings(currency),
          mainCurrency
        )
      },
      {
        label: "Account type",
        value: capitalize(type ?? "") ?? empty
      },
      {
        label: "Name on Bank Account",
        value: validateStrings(nameOnAccount || beneName),
        hidden: !(nameOnAccount || beneName)
      },
      {
        label: "Account",
        value: validateStrings(accountNumber),
        copyRequired: true,
        hidden: !accountNumber
      },
      {
        label: "Created At",
        value: formatDateAndTime(createdAt, timeZone, TimeFormatEnum.Format01)
      },
      // {
      //   label: "Branch Code",
      //   value: empty,
      //   hidden: !
      // },
      {
        label: "IBAN",
        value: validateStrings(iban),
        hidden: !iban
      },
      {
        label: "BIC",
        value: validateStrings(bic),
        hidden: !bic
      },
      {
        label: "Intermediary Bank",
        value: validateStrings(intermediaryBank),
        hidden: !intermediaryBank
      }
    ];
  };

  const getWalletDetails = () => {
    const walletDetails = [
      {
        label: "Currency",
        value: currencyFormatter(
          currencies,
          validateStrings(currency),
          mainCurrency
        )
      },
      {
        label: "Account Type",
        value: capitalize(type ?? "") ?? empty
      },
      {
        label: "Blockchain",
        value: getBlockchainName(mainCurrency),
        hidden: !["ETH", "TRX"].includes(mainCurrency ?? "")
      },
      {
        label: "Name Of Wallet",
        value: validateStrings(nameOnAccount || beneName),
        hidden: !(nameOnAccount || beneName)
      },
      {
        label: "Wallet Address",
        value: validateStrings(accountNumber),
        copyRequired: true,
        hidden: !accountNumber
      },
      {
        label: "Created At",
        value: formatDateAndTime(createdAt, timeZone, TimeFormatEnum.Format01)
      }
    ];
    return walletDetails;
  };

  return (
    <PageWrapper>
      <Spin loading={loading}>
        <PageHeader>
          <HeaderContent.LeftSide>
            <Text size="xxlarge" weight="bold" style={{ lineHeight: "120%" }}>
              {beneficiary?.accountDetails?.nameOnAccount ?? empty}{" "}
            </Text>
            <div style={{ margin: "1px 10px 6px 12px" }}>
              <CurrencyTag
                currency={
                  currencyFormatter(currencies, currency, mainCurrency) ?? ""
                }
                prefix={isCurrencyPresent(currency ?? empty)}
              />
            </div>
          </HeaderContent.LeftSide>
          <HeaderContent.RightSide>
            <Button
              type="link"
              icon={{ name: "delete" }}
              style={{ marginBottom: "12px", width: "125px" }}
              label="Delete beneficiary"
              onClick={() => {
                setShowDeleteBeneModal(true);
                setSelectedBene({
                  beneId: beneficiary?.id,
                  beneName: nameOnAccount || beneName
                });
              }}
            />
          </HeaderContent.RightSide>
        </PageHeader>
        <div className={Styles["bene_status-text"]}>
          <Status size="small" status={status ?? empty} />
        </div>
        {(address?.country || getFormattedAddress(address ?? {})) && (
          <>
            <Cards.SummaryCard
              key="1"
              className={Styles["card_summaryCard"]}
              columns={24}
              title="Beneficiary Details"
              showCopyIcon
              summaryList={getBeneDetails()}
              style={{ borderRadius: "10px", marginBottom: "20px" }}
            />
          </>
        )}

        {!cryptoCurrencies.includes(currency ?? empty) ? (
          <Cards.SummaryCard
            key="2"
            columns={8}
            title="Account Details"
            showCopyIcon
            summaryList={getAccountDetails()}
            style={{ borderRadius: "10px", marginBottom: "20px" }}
          />
        ) : (
          <>
            <Cards.SummaryCard
              key={"3"}
              style={{ borderRadius: "10px" }}
              columns={8}
              title="Wallet Details"
              showCopyIcon
              summaryList={getWalletDetails()}
            />
          </>
        )}
      </Spin>
      <DeleteBeneficiary
        show={showDeleteBeneModal}
        beneId={selectedBene?.beneId}
        beneName={selectedBene.beneName}
        toggleShow={() => setShowDeleteBeneModal(false)}
        callBackOnBeneDelete={() => navigate("/payments")}
      />
    </PageWrapper>
  );
};

export { BeneficiaryDetails };
