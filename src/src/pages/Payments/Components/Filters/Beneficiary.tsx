import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Form,
  Select,
  Button,
  Drawer
} from "@payconstruct/design-system";
// import { getName } from "country-list";
import { useQuery } from "@apollo/client";
// import { getClientAccounts } from "state/contextProviders/apollo/queries/Accounts";
// import { getBeneficiaries } from "state/contextProviders/apollo/queries/Beneficiary";
import { BeneFilterForm } from "pages/Payments/Payments.interface";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { SetBeneFilters } from "pages/Payments/PaymentsContext/PaymentsActions";
import { TabNameEnum } from "pages/Payments/enums";
import { getBeneficiaries } from "state/contextProviders/apollo/queries/Beneficiary";
// import { currencyFormatter } from "utils/Transformer";

import Styles from "./Filters.module.css";

interface IDrawerProps {
  showBeneFilters: boolean;
  loading: boolean;
  onClose: () => void;
  onResetFiltersCallback: () => void;
  onSubmitBeneFilters?: (values: BeneFilterForm) => void;
}

export const InitialForm = {
  currency: undefined,
  country: undefined,
  status: undefined
};

const BeneficiaryFilters: React.FC<IDrawerProps> = ({
  showBeneFilters = false,
  loading,
  onClose,
  onSubmitBeneFilters,
  onResetFiltersCallback
}) => {
  const [form] = Form.useForm();
  const {
    dispatch,
    state: {
      // currencies,
      showFilters,
      hasBeneFiltersActive,
      beneFilters
    }
  } = useContext(PaymentsContext);
  const [isButtonDisabled, setBtnDisabled] = useState<boolean>(true);

  // const { data: clientAccounts } = useQuery(getClientAccounts, {
  //   variables: {
  //     productIds: [ProductId.CorporateAccount, ProductId.DigitalAssetVault]
  //   },
  //   fetchPolicy: "cache-first"
  // });

  const { data: BeneResponse } = useQuery(getBeneficiaries, {
    fetchPolicy: "cache-first",
    skip: showFilters ? false : true
  });

  // const allClientAccounts = clientAccounts?.GetClientAccounts?.accounts ?? [];
  const AllBenes = BeneResponse?.GetBeneficiaries?.beneficiaries ?? [];
  const isBtnDisabled = hasBeneFiltersActive ? false : true;

  useEffect(() => {
    setBtnDisabled(isBtnDisabled);
  }, [isBtnDisabled]);

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  const currencyOptions: { label: string; value: string }[] = [
    ...new Map(
      (AllBenes || [])
        .filter(Boolean)
        .map((item) => (item ? [item["currency"], item] : [item, item]))
    ).values()
  ]
    .map((bene) => {
      // const formatCurrencyLabel = currencyFormatter(
      //   currencies,
      //   bene?.currency ?? undefined,
      //   bene?.mainCurrency ?? undefined
      // );
      return {
        label: bene?.currency ?? "",
        value: bene?.currency ?? ""
      };
    })
    .sort((a, b) => a?.label?.localeCompare(b?.label));

  // console.log(uniqueBeneFilter, "uniqueArrayFilter--");

  // const currencyOptions: { label: string; value: string }[] = Array.from(
  //   new Set((AllBenes || []).map((bene) => bene?.currency && bene?.currency))
  // ).map((currency) => {
  //   console.log(currency, "CURRENCY---");
  //   return {
  //     label: currency ?? "",
  //     value: currency ?? ""
  //   };
  // });

  // const currencyOptions: { label: string; value: string }[] = Array.from(
  //   new Set(
  //     (allClientAccounts || []).map(
  //       (account) => account?.currency && account?.currency
  //     )
  //   )
  // ).map((currency) => {
  //   return {
  //     label: currency ?? "",
  //     value: currency ?? ""
  //   };
  // });

  // const countryOptions: { label: string; value: string }[] = Array.from(
  //   new Set(
  //     (AllBenes || []).map(
  //       (bene) => bene && bene?.beneficiaryDetails?.address?.country
  //     )
  //   )
  // ).map((country) => {
  //   return {
  //     label: getName(country ?? "") ?? "",
  //     value: country ?? ""
  //   };
  // });
  // const validateCountryOptions = countryOptions?.filter(
  //   (country) => country?.value !== ""
  // );

  const handleClearFilters = () => {
    onResetFiltersCallback();
    setBtnDisabled(true);
    form.setFieldsValue(InitialForm);
    dispatch(
      SetBeneFilters({
        ...InitialForm,
        limit: 0
      })
    );
  };

  const onFormFieldClearHandler = (field: string) => {
    Promise.resolve(
      dispatch(SetBeneFilters({ ...beneFilters, [field]: undefined }))
    ).then(() => setBtnDisabled(true));
  };

  const getDrawerContent = () => {
    return (
      <Form
        key={TabNameEnum.Beneficiaries}
        form={form}
        initialValues={beneFilters}
        onFieldsChange={(_, allFields) => {
          allFields.length && setBtnDisabled(false);
        }}
        onFinish={(formData: BeneFilterForm) =>
          onSubmitBeneFilters && onSubmitBeneFilters(formData)
        }
      >
        <div>
          <Form.Item name="currency">
            <Select
              allowClear
              mode="multiple"
              label="Currency"
              options={currencyOptions}
              placeholder="Select Currency"
              optionFilterProp="label"
              onChange={(currency) => {
                form.setFieldsValue({
                  currency: currency?.length ? currency : undefined
                });
              }}
              onClear={() => onFormFieldClearHandler("currency")}
            />
          </Form.Item>
          {/* <Form.Item name="country">
            <Select
              allowClear
              label="Country"
              options={validateCountryOptions}
              placeholder="Select Country"
              optionFilterProp="label"
              onClear={() => onFormFieldClearHandler("country")}
            />
          </Form.Item> */}
          <Form.Item name="status">
            <Select
              allowClear
              label="Status"
              mode="multiple"
              optionlist={[
                ["new", "New"],
                ["approved", "Approved"],
                ["rejected", "Rejected"]
              ]}
              placeholder="Select Status"
              optionFilterProp="children"
              onChange={(status) => {
                form.setFieldsValue({
                  status: status?.length ? status : undefined
                });
              }}
              onClear={() => onFormFieldClearHandler("status")}
            />
          </Form.Item>
        </div>

        <div className={Styles["advanceFilter__footer"]}>
          <Button
            label="Cancel"
            type="secondary"
            disabled={loading}
            onClick={handleOnClose}
            style={{ marginRight: "14px" }}
          />
          <Button
            formType="submit"
            label="Apply"
            type="primary"
            loading={loading}
            disabled={isButtonDisabled}
            onClick={() => form.submit()}
          />
        </div>
      </Form>
    );
  };

  return (
    <Drawer
      visible={showBeneFilters}
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
            disabled={!hasBeneFiltersActive}
            onClick={handleClearFilters}
          />
        </div>
      }
    >
      {getDrawerContent()}
    </Drawer>
  );
};

export default BeneficiaryFilters;
