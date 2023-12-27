import { BeneficiaryResponse } from "API";
import {
  BeneFilterForm,
  Currencies,
  PaymentFilterForm
} from "../Payments.interface";

export interface PaymentsStateProps {
  timeZone: string;
  selectedTab: string;
  showFilters: boolean;
  currencies: Currencies[];

  // benes
  beneNextToken: string | undefined;
  paymentsNextToken: string | undefined;
  beneSearchText: string;
  hasBeneFiltersActive: boolean;
  beneFilters: BeneFilterForm;
  selectedBeneDetails: BeneficiaryResponse;

  // payments
  paymentsSearchText: string;
  hasPaymentsFiltersActive: boolean;
  paymentFilters: PaymentFilterForm;
}

export const PaymentsState: PaymentsStateProps = {
  timeZone: "Asia/Hong_Kong",
  selectedTab: "payments",
  showFilters: false,
  currencies: [],

  // benes
  beneNextToken: undefined,
  paymentsNextToken: undefined,
  selectedBeneDetails: {
    beneficiaries: [],
    count: 0,
    nextToken: ""
  },
  beneSearchText: "",
  hasBeneFiltersActive: false,
  beneFilters: {
    limit: 0,
    currency: undefined,
    country: undefined,
    status: undefined,
    nextToken: undefined
  },

  // payments
  paymentsSearchText: "",
  hasPaymentsFiltersActive: false,
  paymentFilters: {
    limit: 50,
    conversion: false,
    fromToDate: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    currencies: undefined,
    type: undefined,
    status: undefined
  }
};
