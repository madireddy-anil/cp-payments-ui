import React, { useContext } from "react";
import { Button, Row, Col, Badge } from "@payconstruct/design-system";
import BeneficiaryFilters from "../Filters/Beneficiary";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import {
  SetBeneSearchText,
  ToggleFilters
} from "pages/Payments/PaymentsContext/PaymentsActions";
import {
  BeneFilterForm,
  PaymentFilterForm
} from "pages/Payments/Payments.interface";
import Styles from "./Header.module.css";
import { Search } from "../Search/Search";
import { TabNameEnum } from "pages/Payments/enums";

interface HeaderProps {
  loading: boolean;
  isFiltersActive: boolean;
  onResetSearchCallback: () => void;
  onResetFiltersCallback: () => void;
  paymentsFilterProps?: PaymentFilterForm;
  onClickHandler: (a: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmitBeneFilters: (values: BeneFilterForm) => void;
}

const Header: React.FC<HeaderProps> = ({
  loading,
  isFiltersActive = false,
  onResetSearchCallback,
  onResetFiltersCallback,
  onSubmitBeneFilters,
  onClickHandler
}) => {
  const {
    state: {
      beneSearchText,
      paymentsSearchText,
      selectedTab,
      showFilters,
      beneFilters,
      paymentFilters
    },
    dispatch
  } = useContext(PaymentsContext);

  return (
    <div className={Styles["pms_search"]}>
      <Row>
        <Col flex="1 1 200px">
          <Search
            selectedTab={selectedTab}
            beneSearchText={beneSearchText}
            paymentsSearchText={paymentsSearchText}
            paymentsFilters={paymentFilters}
            beneFilters={beneFilters}
            isFiltersActive={isFiltersActive}
            onClearCallback={() => {
              onResetSearchCallback();
              dispatch(SetBeneSearchText(""));
            }}
          />
        </Col>
        <Col className={Styles["pay_searchFilters-btn"]}>
          <Button
            style={{ marginLeft: "30px" }}
            type="primary"
            label={"Add New Beneficiary"}
            onClick={onClickHandler}
          />
          <Badge dot={isFiltersActive}>
            <Button
              style={{ marginLeft: "20px" }}
              type="tertiary"
              label="Filters"
              icon={{
                name: "filter"
              }}
              onClick={() => dispatch(ToggleFilters(true))}
            />
          </Badge>
        </Col>
      </Row>
      <BeneficiaryFilters
        loading={loading}
        showBeneFilters={
          showFilters && selectedTab === TabNameEnum.Beneficiaries
        }
        onSubmitBeneFilters={onSubmitBeneFilters}
        onResetFiltersCallback={onResetFiltersCallback}
        onClose={() => {
          dispatch(ToggleFilters(false));
        }}
      />
    </div>
  );
};

export { Header };
