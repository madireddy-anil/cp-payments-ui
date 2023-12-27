import {
  hasBeneFiltersExist,
  hasPaymentsFiltersExist
} from "utils/Transformer";
import { ActionType, Actions } from "./PaymentsActions";
import { PaymentsStateProps } from "./PaymentsState";

export function BeneReducer(
  state: PaymentsStateProps,
  action: ActionType
): PaymentsStateProps {
  switch (action.type) {
    case Actions.UPDATE_CURRENCIES:
      return { ...state, currencies: action.payload };
    case Actions.TOGGLE_FILTERS:
      return { ...state, showFilters: action.payload };
    case Actions.UPDATE_BENE_SEARCH_TEXT:
      return { ...state, beneSearchText: action.payload };
    case Actions.UPDATE_PAYMENTS_SEARCH_TEXT:
      return { ...state, paymentsSearchText: action.payload };
    case Actions.UPDATE_BENE_NEXT_TOKEN:
      return { ...state, beneNextToken: action.payload };
    case Actions.UPDATE_SELECTED_TAB:
      return { ...state, selectedTab: action.payload };
    case Actions.UPDATE_BENE_FILTERS:
      return {
        ...state,
        beneFilters: action.payload,
        hasBeneFiltersActive: hasBeneFiltersExist(action.payload)
      };
    case Actions.UPDATE_PAYMENTS_FILTERS:
      return {
        ...state,
        paymentFilters: action.payload,
        hasPaymentsFiltersActive: hasPaymentsFiltersExist(action.payload),
        paymentsNextToken: action?.nextToken ? action?.nextToken : undefined
      };
    default:
      return state;
  }
}
