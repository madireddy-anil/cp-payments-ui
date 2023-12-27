import {
  BeneFilterForm,
  Currencies,
  PaymentFilterForm
} from "../Payments.interface";

export const Actions = {
  TOGGLE_FILTERS: "TOGGLE_FILTERS",
  UPDATE_BENE_SEARCH_TEXT: "UPDATE_BENE_SEARCH_TEXT",
  UPDATE_PAYMENTS_SEARCH_TEXT: "UPDATE_PAYMENTS_SEARCH_TEXT",
  UPDATE_BENE_NEXT_TOKEN: "UPDATE_BENE_NEXT_TOKEN",
  UPDATE_SELECTED_TAB: "UPDATE_SELECTED_TAB",
  UPDATE_BENE_FILTERS: "UPDATE_BENE_FILTERS",
  UPDATE_PAYMENTS_FILTERS: "UPDATE_PAYMENTS_FILTERS",
  UPDATE_CURRENCIES: "UPDATE_CURRENCIES"
} as const;

export type PayloadAction<T> = T;

type SetToggleFilters = {
  type: typeof Actions.TOGGLE_FILTERS;
  payload: boolean;
};
export const ToggleFilters = (payload: boolean) => {
  return {
    type: Actions.TOGGLE_FILTERS,
    payload
  };
};

type SetSelectedTab = {
  type: typeof Actions.UPDATE_SELECTED_TAB;
  payload: string;
};
export const SetSelectedTab = (payload: string) => {
  return {
    type: Actions.UPDATE_SELECTED_TAB,
    payload
  };
};

type SetBeneSearchText = {
  type: typeof Actions.UPDATE_BENE_SEARCH_TEXT;
  payload: string;
};
export const SetBeneSearchText = (payload: string) => {
  return {
    type: Actions.UPDATE_BENE_SEARCH_TEXT,
    payload
  };
};

type SetPaymentsSearchText = {
  type: typeof Actions.UPDATE_PAYMENTS_SEARCH_TEXT;
  payload: string;
};
export const SetPaymentsSearchText = (payload: string) => {
  return {
    type: Actions.UPDATE_PAYMENTS_SEARCH_TEXT,
    payload
  };
};

type SetBeneNextToken = {
  type: typeof Actions.UPDATE_BENE_NEXT_TOKEN;
  payload: string | undefined;
};
export const SetBeneNextToken = (payload: string | undefined) => {
  return {
    type: Actions.UPDATE_BENE_NEXT_TOKEN,
    payload
  };
};

type SetBeneFilters = {
  type: typeof Actions.UPDATE_BENE_FILTERS;
  payload: BeneFilterForm;
};
export const SetBeneFilters = (payload: BeneFilterForm) => {
  return {
    type: Actions.UPDATE_BENE_FILTERS,
    payload
  };
};

type SetPaymentsFilters = {
  type: typeof Actions.UPDATE_PAYMENTS_FILTERS;
  payload: PaymentFilterForm;
  nextToken: string | undefined;
};
export const SetPaymentsFilters = (
  payload: PaymentFilterForm,
  nextToken?: string | undefined
) => {
  return {
    type: Actions.UPDATE_PAYMENTS_FILTERS,
    payload,
    nextToken
  };
};

type SetCurrencies = {
  type: typeof Actions.UPDATE_CURRENCIES;
  payload: Currencies[];
};
export const SetCurrencies = (payload: Currencies[]) => {
  return {
    type: Actions.UPDATE_CURRENCIES,
    payload
  };
};

export type ActionType =
  | SetSelectedTab
  | SetToggleFilters
  | SetBeneSearchText
  | SetPaymentsSearchText
  | SetBeneNextToken
  | SetBeneFilters
  | SetPaymentsFilters
  | SetCurrencies;
