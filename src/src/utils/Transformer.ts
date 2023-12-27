import { CurrencyPrefixType } from "@payconstruct/design-system/dist/components/atoms/Icon/Icon";
import { BeneficiariesState, Payment } from "API";
import moment from "moment-timezone";
import {
  BeneFilterForm,
  Currencies,
  PaymentFilterForm
} from "pages/Payments/Payments.interface";

export const getFormattedAddress = (itemsObject: {
  [key: string]: string | number | null;
}) => {
  const sortingArr = [
    "buildingName",
    "floor",
    "room",
    "buildingNumber",
    "street",
    "city",
    "state",
    "country",
    "postCode",
    "postalCode",
    "postBox",
    "countryCode"
  ];
  let str = "";
  if (itemsObject !== null) {
    for (let i = 0; i < sortingArr.length; i++) {
      if (sortingArr[i]) {
        if (itemsObject[sortingArr[i]]) {
          if (i === 0) {
            str += itemsObject[sortingArr[i]];
          } else {
            str += ", " + itemsObject[sortingArr[i]];
          }
        }
      }
    }
  }

  return str.charAt(0) === "," ? str.slice(1) : str;
};

export const fractionFormat = (
  amount: number | undefined,
  maxDecimals?: number
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals ?? 6
  });
  return formatter.format(amount ?? 0);
};

export const capitalize = (label: string) => {
  if (typeof label !== "string") return "";
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const formatDateAndTime = (
  date: Date | string | undefined,
  tz: string,
  format: string
) => {
  const dateTime = moment(date);
  const formateDateTime = dateTime.tz(tz).format(format);
  return formateDateTime;
};

export const isCurrencyPresent = (currency: string) => {
  const currencies = [currency];
  if (currencies?.includes(currency)) {
    return currency as CurrencyPrefixType;
  }
  return undefined;
};

export const toAmountFormat = (amount: number) => {
  const value = typeof amount === "number" ? amount.toFixed(2) : amount;
  return toStringAmountCommaSeparated(value);
};

const toStringAmountCommaSeparated = (amount: string) => {
  if (!amount) {
    return "0";
  }
  return amount.toString().replace(/^[+-]?\d+/, function (int) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  });
};

export const hasBeneFiltersExist = (filters: BeneFilterForm) => {
  const { country, currency, status } = filters;
  return country || currency || status ? true : false;
};

export const hasPaymentsFiltersExist = (filters: PaymentFilterForm) => {
  const { fromToDate, currencies, type, status } = filters;
  return fromToDate?.length || currencies || type || status ? true : false;
};

export const validateStrings = (
  stringOne: string | number | undefined,
  stringTwo?: string | undefined
) => {
  if (stringOne && stringTwo) {
    return `${stringOne} ${stringTwo}`;
  }
  if (stringOne) {
    return `${stringOne}`;
  }
  if (stringTwo) {
    return `${stringTwo}`;
  } else return undefined;
};

export const paymentsDataSource = (
  payments: Payment[],
  currencies: Currencies[]
) => {
  payments.forEach((payment: Payment) => {
    const getCurrencyDecimal = currencies.find(
      (currency: Currencies) => payment?.creditCurrency === currency?.code
    );
    const formatAmount = fractionFormat(
      payment?.creditAmount,
      parseInt(getCurrencyDecimal?.decimals ?? "2")
    );
    payment.creditAmount = parseFloat(formatAmount);
  });
  return payments;
};

export const sortBeneficiaries = (
  a: BeneficiariesState,
  b: BeneficiariesState
) => {
  const a_name = a?.nameOnAccount?.toLowerCase();
  const b_name = b?.nameOnAccount?.toLowerCase();

  if (a_name && b_name && a_name < b_name) return -1;
  return 1;
};

export const truncateString = (str: string | undefined) => {
  return `${str?.slice(0, 6)}...${str?.slice(-6)}`;
};

export const currencyFormatter = (
  currencies: Currencies[],
  currencyCode: string | undefined,
  mainCurrency: string | undefined
) => {
  let returnCurrency;
  (currencies || [])
    .filter(
      (currency: Currencies) => currency?.mainCurrency && currency?.mainCurrency
    )
    .map((currency: Currencies) => {
      if (mainCurrency && mainCurrency === currency?.code) {
        returnCurrency = `${currencyCode} (${currency?.name?.replace(
          /-/g,
          ""
        )})`;
      }
    });
  return returnCurrency ? returnCurrency : currencyCode;
};
