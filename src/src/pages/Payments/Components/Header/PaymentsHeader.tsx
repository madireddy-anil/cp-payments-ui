import React, { useContext } from "react";
import { Button, Row, Col, Badge } from "@payconstruct/design-system";
import PaymentsFilters from "../Filters/Payments";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import {
  SetPaymentsSearchText,
  ToggleFilters
} from "pages/Payments/PaymentsContext/PaymentsActions";
import { PaymentFilterForm } from "pages/Payments/Payments.interface";
import Styles from "./Header.module.css";
import { Search } from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { TabNameEnum } from "pages/Payments/enums";
import { useHostStore } from "hostStore/hostStore";
import {
  Permissions,
  useCheckPermissions
} from "customHooks/useCheckPermissions";

interface HeaderProps {
  loading: boolean;
  onResetSearchCallback: () => void;
  onResetFiltersCallback: () => void;
  setIsFormFieldCleared: (val: boolean) => void;
  paymentsFilterProps?: PaymentFilterForm;
  onSubmitPaymentFilters: (values: PaymentFilterForm) => void;
}

const Header: React.FC<HeaderProps> = ({
  loading,
  paymentsFilterProps,
  onResetSearchCallback,
  onResetFiltersCallback,
  setIsFormFieldCleared,
  onSubmitPaymentFilters
}) => {
  const {
    state: {
      beneSearchText,
      paymentsSearchText,
      selectedTab,
      showFilters,
      beneFilters,
      paymentFilters,
      hasPaymentsFiltersActive
    },
    dispatch
  } = useContext(PaymentsContext);
  const navigate = useNavigate();
  const { hasPermission } = useCheckPermissions();
  const { updateMenuShow } = useHostStore();

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
            isFiltersActive={hasPaymentsFiltersActive}
            onClearCallback={() => {
              onResetSearchCallback();
              dispatch(SetPaymentsSearchText(""));
            }}
          />
        </Col>
        <Col className={Styles["pay_searchFilters-btn"]}>
          {hasPermission(Permissions.paymentsWrite) && (
            <Button
              style={{ marginLeft: "30px" }}
              type="primary"
              label={"Make a payment"}
              onClick={() => {
                navigate("/new-payment");
                updateMenuShow(false);
              }}
            />
          )}
          <Badge dot={hasPaymentsFiltersActive}>
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
      <PaymentsFilters
        loading={loading}
        formProps={paymentsFilterProps}
        showPaymentsFilters={
          showFilters && selectedTab === TabNameEnum.Payments
        }
        onSubmitPaymentFilters={onSubmitPaymentFilters}
        onResetFiltersCallback={onResetFiltersCallback}
        setIsFormFieldCleared={setIsFormFieldCleared}
        onClose={() => {
          dispatch(ToggleFilters(false));
        }}
      />
    </div>
  );
};

export { Header };
