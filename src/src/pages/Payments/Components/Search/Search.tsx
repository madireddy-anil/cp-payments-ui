import React, { useContext, useState } from "react";
import { Search as Searcher } from "@payconstruct/design-system";
import { TabNameEnum } from "pages/Payments/enums";
import { useDebounce } from "customHooks/useDebounce";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import {
  SetBeneFilters,
  SetBeneNextToken,
  SetBeneSearchText,
  SetPaymentsFilters,
  SetPaymentsSearchText
} from "pages/Payments/PaymentsContext/PaymentsActions";
import {
  BeneFilterForm,
  PaymentFilterForm
} from "pages/Payments/Payments.interface";

interface SearchProps {
  selectedTab: string;
  beneSearchText: string;
  paymentsSearchText: string;
  isFiltersActive: boolean;
  beneFilters: BeneFilterForm;
  paymentsFilters: PaymentFilterForm;
  onClearCallback: () => void;
}

const Search: React.FC<SearchProps> = ({
  selectedTab,
  beneSearchText,
  beneFilters,
  paymentsFilters,
  paymentsSearchText,
  onClearCallback
}) => {
  const { dispatch } = useContext(PaymentsContext);
  const [searchKey, setSearchKey] = useState<string>("");

  useDebounce(
    () => {
      if (selectedTab === TabNameEnum.Payments) {
        dispatch(SetPaymentsSearchText(searchKey));
        dispatch(SetPaymentsFilters({ ...paymentsFilters }, undefined));
      } else {
        dispatch(SetBeneNextToken(undefined));
        dispatch(SetBeneSearchText(searchKey));
        dispatch(SetBeneFilters({ ...beneFilters, nextToken: undefined }));
      }
    },
    400,
    [searchKey]
  );

  const onChangeSearch = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(value);
    !value && onClearCallback();
  };

  const getDefaultValue = (selectedTab: string) => {
    let defaultValue;
    switch (selectedTab) {
      case TabNameEnum.Payments:
        defaultValue = paymentsSearchText;
        break;
      case TabNameEnum.Beneficiaries:
        defaultValue = beneSearchText;
        break;
      default:
        break;
    }
    return defaultValue;
  };

  return (
    <div>
      <Searcher
        name={selectedTab}
        bordered={true}
        onChange={onChangeSearch}
        placeholder={
          selectedTab === TabNameEnum.Payments
            ? "Search by counterparty, transaction reference or currency."
            : "Search by beneficiary name, account number or currency."
        }
        onClear={() => onClearCallback()}
        defaultValue={getDefaultValue(selectedTab)}
      />
      {/* {isFiltersActive && (beneSearchText || paymentsSearchText) && (
        <>
          <Text size="xxsmall">
            Your search results are affected by the filters you have applied. To
            expand your search, please clear your filters.
          </Text>
          <Spacer size={10} />
        </>
      )} */}
    </div>
  );
};

export { Search };
