import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  PageWrapper,
  TableWrapper,
  Notification,
  Spin,
  Icon
} from "@payconstruct/design-system";
import { TimeFormatEnum } from "pages/Payments/enums";
import {
  Currencies,
  PaymentFilterForm
} from "pages/Payments/Payments.interface";
import {
  SetPaymentsFilters,
  ToggleFilters
} from "pages/Payments/PaymentsContext/PaymentsActions";
import {
  getPayments,
  paymentsFullTextSearch
} from "state/contextProviders/apollo/queries/Payments";
import { paymentFilterFormValidation } from "pages/Payments/PaymentsHelpers";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import {
  currencyFormatter,
  formatDateAndTime,
  fractionFormat,
  truncateString
} from "utils/Transformer";
import { PaymentsInitialFormValues } from "../Filters/Payments";
import InfiniteScroll from "react-infinite-scroll-component";
import { Header as HeaderWrapper } from "../Header/PaymentsHeader";
import { Loader } from "../Loader/Loader";
import { Status } from "../Status/Status";
import { useQuery } from "@apollo/client";
import copy from "copy-to-clipboard";
import { Payment } from "API";
import Styles from "./Payments.module.css";
import { environment } from "config/variables";

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const {
    dispatch,
    state: {
      currencies,
      hasPaymentsFiltersActive,
      paymentsSearchText,
      timeZone,
      paymentFilters,
      paymentsNextToken
    }
  } = useContext(PaymentsContext);

  const [hasScrollActive, setHasScrollActive] = useState<boolean>(false);
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [lastPagePayments, setLastPagePayments] = useState<Payment[]>([]);

  const defaultTableHeight = "70vh";
  const [tableHeight, setTableHeight] = useState(defaultTableHeight);

  const [isFormFieldCleared, setIsFormFieldCleared] = useState(false);

  const nextToken = hasPaymentsFiltersActive ? undefined : paymentsNextToken;

  useEffect(() => {
    !hasPaymentsFiltersActive &&
      dispatch(SetPaymentsFilters({ ...paymentFilters, limit: 50 }, undefined));
  }, []);

  const { loading: allPaymentsLoading } = useQuery(getPayments, {
    variables: {
      nextToken: nextToken,
      ...paymentFilters
    },
    onCompleted: (paymentsResponse: { GetPayments: Payment[] }) => {
      const allPayments = paymentsResponse.GetPayments;
      setStatePaymentsFun(allPayments);
      setLastPagePayments(allPayments);
      const tableHeight =
        document?.getElementById("paymentsScrollDev")?.clientHeight ?? 0;
      setTableHeight(
        tableHeight > 660
          ? defaultTableHeight
          : `${document?.getElementById("paymentsScrollDev")?.clientHeight}px`
      );
    },
    skip: !!paymentsSearchText,
    fetchPolicy: "no-cache"
  });

  const { loading: paymentsSearchLoading } = useQuery(paymentsFullTextSearch, {
    variables: {
      text: paymentsSearchText,
      ...paymentFilters
    },
    onCompleted: (paymentsResponse: { PaymentsFullTextSearch: Payment[] }) => {
      const allPayments = paymentsResponse.PaymentsFullTextSearch;
      setStatePaymentsFun(allPayments);
      setLastPagePayments(allPayments);
      const tableHeight =
        document?.getElementById("paymentsScrollDev")?.clientHeight ?? 0;
      setTableHeight(
        tableHeight > 660
          ? defaultTableHeight
          : `${document?.getElementById("paymentsScrollDev")?.clientHeight}px`
      );
    },
    skip: !paymentsSearchText,
    fetchPolicy: "no-cache"
  });

  const setStatePaymentsFun = (payments: Payment[]) => {
    const paymentsTableData: Payment[] = [];
    paymentsSearchText || hasPaymentsFiltersActive || isFormFieldCleared
      ? setAllPayments(payments)
      : setAllPayments((prev) => [...prev, ...payments]);
    return paymentsTableData;
  };

  const onSubmit = (formProps: PaymentFilterForm) => {
    // onSubmit payments filters form
    const props = paymentFilterFormValidation(formProps);
    fetchPayments({ ...props, conversion: false, limit: 25 }, true);
  };

  const fetchPayments = (data: PaymentFilterForm, applyFilters?: boolean) => {
    Promise.all([
      setAllPayments([]),
      dispatch(SetPaymentsFilters({ ...data, limit: data.limit }, undefined))
    ]).then(() => {
      setHasScrollActive(false);
      applyFilters && dispatch(ToggleFilters(false));
    });
  };

  const getPaymentsOnScroll = () => {
    const lastRecord = allPayments.slice(-1);
    const nextToken = lastRecord[0]?._id ?? undefined;
    dispatch(
      SetPaymentsFilters(
        {
          ...paymentFilters,
          limit: paymentFilters.limit + 25
        },
        nextToken
      )
    );
  };

  const resetFilters = (filterType: string) => {
    if (filterType === "ResetSearch") {
      setAllPayments([]);
      dispatch(SetPaymentsFilters({ ...paymentFilters }, undefined));
    } else {
      fetchPayments({
        ...PaymentsInitialFormValues,
        limit: 50
      });
    }
  };

  const infiniteScrollHandler = () => {
    setHasScrollActive(true);
    getPaymentsOnScroll();
  };

  const onHandleClickPayment = (id: string) => {
    dispatch(SetPaymentsFilters({ ...paymentFilters }, undefined));
    navigate(`/payment/summary/${id}`);
  };

  const columns = [
    {
      title: "Counterparty",
      key: "creditorName",
      dataIndex: "creditorName",
      width: "16.6%",
      fixed: "left",
      ellipsis: true,
      render: (_: void, record: Payment) =>
        renderColumn(record?._id, record?.creditor?.creditorName)
    },
    {
      title: "Currency",
      key: "creditCurrency",
      dataIndex: "creditCurrency",
      width: "16.6%",
      ellipsis: true,
      render: (_: void, record: Payment) => {
        return renderColumn(
          record?._id,
          currencyFormatter(
            currencies,
            record?.creditCurrency,
            record?.mainCreditCurrency
          )
        );
      }
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: "16.6%",
      ellipsis: true,
      render: (_: void, record: Payment) => {
        const symbol = record?.isOutbound ? "-" : "+";
        const getCurrencyDecimal = currencies.find(
          (currency: Currencies) => record?.creditCurrency === currency?.code
        );
        return renderColumn(
          record?._id,
          `${symbol} ${fractionFormat(
            record?.creditAmount,
            parseInt(getCurrencyDecimal?.decimals ?? "0")
          )}`
        );
      }
    },
    {
      title: "Execution Date",
      key: "createdAt",
      dataIndex: "createdAt",
      width: "16.6%",
      ellipsis: true,
      render: (_: void, record: Payment) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onHandleClickPayment(record?._id ?? "")}
          >
            {formatDateAndTime(
              record?.createdAt,
              timeZone,
              TimeFormatEnum.Format04
            )}
          </div>
        );
      }
    },
    {
      title: "Transaction reference",
      key: "transactionReference",
      dataIndex: "transactionReference",
      width: "16.6%",
      render: (_: void, record: Payment) => {
        return (
          <div className={Styles["txn_Ref"]}>
            <Icon
              name="copy"
              onClick={() =>
                copy(record?.transactionReference ?? "", {
                  onCopy: Notification({
                    type: "success",
                    message: "Copied to clipboard."
                  })
                })
              }
            />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => onHandleClickPayment(record?._id ?? "")}
            >
              {truncateString(record?.transactionReference)}
            </div>
          </div>
        );
      }
    },
    {
      key: "Status",
      title: "Status",
      dataIndex: "status",
      width: "16.6%",
      fixed: "right",
      render: (status: string) => <Status status={status ?? "pending"} />
    }
  ];

  const renderColumn = (
    id: string | undefined,
    value: string | number | undefined
  ) => {
    return (
      <div
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer"
        }}
        onClick={() => onHandleClickPayment(id ?? "")}
      >
        {value}
      </div>
    );
  };

  const totalPaymentsLength = lastPagePayments?.length
    ? lastPagePayments?.length + 10
    : lastPagePayments?.length;
  const hasMoreToScroll = lastPagePayments?.length ? true : false;
  const tableLoader =
    paymentsSearchLoading || (allPaymentsLoading && !allPayments.length);

  return (
    <PageWrapper>
      <HeaderWrapper
        loading={allPaymentsLoading}
        onResetSearchCallback={() => resetFilters("ResetSearch")}
        onResetFiltersCallback={() => resetFilters("ResetAdvanceFilters")}
        setIsFormFieldCleared={setIsFormFieldCleared}
        onSubmitPaymentFilters={onSubmit}
      />
      <TableWrapper>
        <InfiniteScroll
          height={tableHeight}
          dataLength={totalPaymentsLength}
          next={() => {
            setIsFormFieldCleared(false);
            lastPagePayments?.length && infiniteScrollHandler();
          }}
          hasMore={hasMoreToScroll}
          loader={<Loader loading={hasScrollActive && allPaymentsLoading} />}
          scrollThreshold="60%"
          scrollableTarget="paymentsScrollDev"
        >
          <Spin loading={tableLoader}>
            <div className={Styles["ds__table"]}>
              <Table
                id={"paymentsScrollDev"}
                key={"payments-table"}
                sticky
                rowKey={(record) => record?.transactionReference}
                dataSource={allPayments}
                tableColumns={columns}
                pagination={false}
                scroll={{
                  x: allPayments?.length && environment ? 1000 : undefined
                }}
              />
            </div>
          </Spin>
        </InfiniteScroll>
      </TableWrapper>
    </PageWrapper>
  );
};

export { Payments };
