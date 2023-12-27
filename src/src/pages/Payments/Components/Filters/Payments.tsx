import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Drawer,
  Form,
  Select,
  Button,
  DatePicker
} from "@payconstruct/design-system";
import { useQuery } from "@apollo/client";
import { getClientAccounts } from "state/contextProviders/apollo/queries/Accounts";
import { PaymentFilterForm } from "pages/Payments/Payments.interface";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { SetPaymentsFilters } from "pages/Payments/PaymentsContext/PaymentsActions";
import Styles from "./Filters.module.css";
import { ProductId, TabNameEnum } from "pages/Payments/enums";
import { paymentFilterFormValidation } from "pages/Payments/PaymentsHelpers";
import moment from "moment-timezone";

interface IDrawerProps {
  showPaymentsFilters: boolean;
  formProps?: PaymentFilterForm;
  loading: boolean;
  onClose: () => void;
  setIsFormFieldCleared: (val: boolean) => void;
  onResetFiltersCallback: () => void;
  onSubmitPaymentFilters: (values: PaymentFilterForm) => void;
}

export const PaymentsInitialFormValues = {
  dateFrom: undefined,
  dateTo: undefined,
  fromToDate: undefined,
  currencies: undefined,
  type: undefined,
  status: undefined,
  conversion: false
};

const PaymentsFilters: React.FC<IDrawerProps> = ({
  showPaymentsFilters = false,
  loading,
  onClose,
  onSubmitPaymentFilters,
  onResetFiltersCallback,
  setIsFormFieldCleared
}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const {
    dispatch,
    state: { hasPaymentsFiltersActive, paymentFilters }
  } = useContext(PaymentsContext);
  const [isButtonDisabled, setBtnDisabled] = useState<boolean>(true);

  const { data: clientAccounts } = useQuery(getClientAccounts, {
    variables: {
      productIds: [ProductId.CorporateAccount, ProductId.DigitalAssetVault]
    },
    fetchPolicy: "cache-first"
  });

  const allClientAccounts = clientAccounts?.GetClientAccounts?.accounts ?? [];
  const isBtnDisabled = hasPaymentsFiltersActive ? false : true;

  useEffect(() => {
    setBtnDisabled(isBtnDisabled);
  }, [isBtnDisabled]);

  useEffect(() => {
    form.setFieldsValue({ ...paymentFilters });
  }, []);

  const handleClearFilters = () => {
    onResetFiltersCallback();
    setBtnDisabled(true);
    form.resetFields();
    form.setFieldsValue({ ...PaymentsInitialFormValues });
    dispatch(
      SetPaymentsFilters({
        ...PaymentsInitialFormValues,
        limit: 50
      })
    );
  };

  const currencyOptions: { label: string; value: string }[] = Array.from(
    new Set(
      (allClientAccounts || []).map((account) => account && account?.currency)
    )
  )
    .map((currency) => {
      return {
        label: currency ?? "",
        value: currency ?? ""
      };
    })
    .sort((a, b) => a?.label?.localeCompare(b?.label));

  const handleOnClose = () => {
    onClose();
  };

  const onFormFieldClearHandler = (field: string, value: null | undefined) => {
    const validatedFormValues = paymentFilterFormValidation({
      ...paymentFilters,
      [field]: value
    });
    Promise.all([
      dispatch(SetPaymentsFilters(validatedFormValues, undefined)),
      setIsFormFieldCleared(true)
    ]).then(() => setBtnDisabled(true));
  };

  const getDrawerContent = () => {
    return (
      <Form
        key={TabNameEnum.Payments}
        form={form}
        initialValues={paymentFilters}
        onFieldsChange={(_, allFields) => {
          allFields.length && setBtnDisabled(false);
        }}
        onFinish={(formData: PaymentFilterForm) =>
          onSubmitPaymentFilters(formData)
        }
      >
        <div className="filter--fields">
          <Form.Item name="fromToDate">
            <RangePicker
              allowClear
              label="Date Range"
              style={{ width: "100%" }}
              placeholder={["From Date", "To Date"]}
              onChange={(values) => {
                // onClear function
                if (values === null) {
                  onFormFieldClearHandler("fromToDate", null);
                }
              }}
              disabledDate={(current) => current > moment()}
              panelView="single-month-view"
            />
          </Form.Item>
          <Form.Item name="currencies">
            <Select
              allowClear
              label="Currency"
              mode="multiple"
              options={currencyOptions}
              placeholder="Select Currency"
              optionFilterProp="label"
              onClear={() => onFormFieldClearHandler("currencies", undefined)}
            />
          </Form.Item>
          <Form.Item name="type">
            <Select
              allowClear
              label="Payment Direction"
              optionlist={[
                ["IN", "Received"],
                ["OUT", "Sent"]
              ]}
              placeholder="Select Direction"
              optionFilterProp="children"
              onClear={() => onFormFieldClearHandler("type", undefined)}
            />
          </Form.Item>
          <Form.Item name="status">
            <Select
              allowClear
              label="Payment Status"
              optionlist={[
                ["pending", "Pending"],
                ["pendingApproval", "Pending Approval"],
                ["completed", "Completed"],
                ["cancelled", "Cancelled"]
              ]}
              placeholder="Select Status"
              optionFilterProp="children"
              onClear={() => onFormFieldClearHandler("status", undefined)}
            />
          </Form.Item>
        </div>
        <div className={Styles["advanceFilter__footer"]}>
          <Button
            label="Cancel"
            type="secondary"
            onClick={handleOnClose}
            style={{ marginRight: "14px" }}
          />
          <Button
            formType="submit"
            label="Apply"
            type="primary"
            disabled={isButtonDisabled}
            loading={loading}
            onClick={() => form.submit()}
          />
        </div>
      </Form>
    );
  };

  return (
    <Drawer
      visible={showPaymentsFilters}
      onClose={onClose}
      closable={false}
      width={400}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Text weight="bold" size="large">
            Filter
          </Text>
          <Button
            label={"Clear all"}
            size="large"
            type="link"
            disabled={!hasPaymentsFiltersActive}
            onClick={handleClearFilters}
          />
        </div>
      }
    >
      {getDrawerContent()}
    </Drawer>
  );
};

export default PaymentsFilters;
