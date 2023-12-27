import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { Status } from "../Status/Status";
import { Loader } from "../Loader/Loader";
import {
  Table,
  PageWrapper,
  TableWrapper,
  Icon,
  Colors,
  Spin,
  Tooltip,
  Notification
} from "@payconstruct/design-system";
import {
  getBeneficiaries,
  beneficiaryFullTextSearch
} from "state/contextProviders/apollo/queries/Beneficiary";
import {
  SetBeneFilters,
  SetBeneNextToken,
  ToggleFilters
} from "pages/Payments/PaymentsContext/PaymentsActions";
import { Header as HeaderWrapper } from "../Header/BeneHeader";
import { AddNewBene } from "../AddNewBene/AddNewBene";
import { BeneficiariesState, Beneficiary, BeneficiaryResponse } from "API";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { BeneFilterForm } from "pages/Payments/Payments.interface";
import InfiniteScroll from "react-infinite-scroll-component";
import { InitialForm } from "../Filters/Beneficiary";
import { DeleteBeneficiary } from "./DeleteBeneficiary/DeleteBeneficiary";
import Styles from "./Beneficiaries.module.css";
import { useHostStore } from "hostStore/hostStore";
import { environment } from "config/variables";
import {
  currencyFormatter,
  sortBeneficiaries,
  truncateString
} from "utils/Transformer";

// interface BeneficiariesProps {
//   onNewBeneficiaryButtonClick: () => void;
// }

const Beneficiaries: React.FC = () => {
  const navigate = useNavigate();
  const { hasNewBeneCreated, showAddNewBeneModal } = useHostStore();
  const {
    dispatch,
    state: {
      currencies,
      beneSearchText,
      hasBeneFiltersActive,
      beneNextToken,
      beneFilters
    }
  } = useContext(PaymentsContext);

  const [allBenes, setAllBenes] = useState<BeneficiariesState[]>([]);
  const [showNewBeneModal, setShowNewBeneModal] = useState<boolean>(false);
  const [hasScrollActive, setHasScrollActive] = useState<boolean>(false);
  // const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  // const nexttoken = hasBeneFiltersActive ? undefined : beneNextToken;

  const [showDeleteBeneModal, setShowDeleteBeneModal] =
    useState<boolean>(false);
  const [selectedBene, setSelectedBene] = useState<{
    beneId: string | undefined;
    beneName?: string | undefined;
  }>({ beneId: "", beneName: "" });

  const {
    refetch: getBenes,
    loading: allBenesLoading
    // data: beneData
  } = useQuery(getBeneficiaries, {
    variables: {
      ...beneFilters
    },
    onCompleted: (BeneResponse: { GetBeneficiaries: BeneficiaryResponse }) => {
      const AllBenes = BeneResponse?.GetBeneficiaries?.beneficiaries ?? [];
      const nextToken = BeneResponse?.GetBeneficiaries?.nextToken ?? undefined;
      benesFormatterFun(AllBenes);
      dispatch(SetBeneNextToken(nextToken));
      setSelectedBene({ beneId: undefined });
    },
    skip: !!beneSearchText,
    fetchPolicy: "no-cache"
  });

  const { refetch: getSearchedBenes, loading: beneSearchLoading } = useQuery(
    beneficiaryFullTextSearch,
    {
      variables: {
        ...beneFilters,
        limit: undefined,
        text: beneSearchText
      },
      onCompleted: (SearchedBenes: {
        BeneficiaryFullTextSearch: Beneficiary[];
      }) => {
        const SearchedBene = SearchedBenes?.BeneficiaryFullTextSearch ?? [];
        benesFormatterFun(SearchedBene);
      },
      skip: !beneSearchText,
      fetchPolicy: "no-cache"
    }
  );

  useEffect(() => {
    if (hasNewBeneCreated) getBenes();
  }, [hasNewBeneCreated]);

  const benesFormatterFun = (allBenes: Beneficiary[]) => {
    const tableFormatBenes: BeneficiariesState[] = [];
    allBenes.map((item: Beneficiary) => {
      const beneObj = {
        id: item?.id,
        accountNumber:
          item?.accountDetails?.accountNumber || !item.accountDetails?.iban
            ? item?.accountDetails?.accountNumber
            : item.accountDetails?.iban,
        nameOnAccount:
          item?.accountDetails?.nameOnAccount ||
          item?.beneficiaryDetails?.nameOnAccount,
        currency: item?.currency,
        country: item?.beneficiaryDetails?.address?.country,
        mainCurrency: item?.mainCurrency,
        status: item?.status
      };
      return tableFormatBenes.push(beneObj);
    });
    /* Enable this code on infinity scroll 

    if (beneSearchText || hasBeneFiltersActive || !!selectedBene?.beneId) {
      setAllBenes(tableFormatBenes);
    } else {
      setAllBenes((prev) => [...prev, ...tableFormatBenes]);
    }

    */

    /*  since infinity scroll is disabled */
    tableFormatBenes.sort(sortBeneficiaries);
    setAllBenes(tableFormatBenes);
    return tableFormatBenes;
  };

  const onSubmit = (formProps: BeneFilterForm) => {
    // on submit benes filters form
    fetchBenes({ ...formProps, limit: 0 }, true);
  };

  const fetchBenes = (data: BeneFilterForm, applyFilters?: boolean) => {
    Promise.all([
      setAllBenes([]),
      dispatch(
        SetBeneFilters({ ...data, limit: data.limit, nextToken: undefined })
      )
    ]).then(() => {
      setHasScrollActive(false);
      applyFilters && dispatch(ToggleFilters(false));
    });
  };

  const getBenesOnScroll = () => {
    dispatch(
      SetBeneFilters({
        ...beneFilters,
        limit: beneFilters.limit + 10,
        nextToken: beneNextToken ?? undefined
      })
    );
  };

  const resetFilters = (filterType: string) => {
    if (filterType === "ResetSearch") {
      setAllBenes([]);
      dispatch(SetBeneNextToken(undefined));
    } else {
      fetchBenes({ ...InitialForm, limit: 0 });
    }
  };

  const infiniteScrollHandler = () => {
    setHasScrollActive(true);
    getBenesOnScroll();
  };

  const columns = [
    {
      title: "Name",
      key: "nameOnAccount",
      dataIndex: "nameOnAccount",
      width: "19%",
      fixed: "left",
      render: (_: void, record: BeneficiariesState) =>
        renderColumn(record?.id, record?.nameOnAccount)
    },
    {
      title: "Currency",
      key: "currency",
      dataIndex: "currency",
      width: "19%",
      render: (_: void, record: BeneficiariesState) => {
        return renderColumn(
          record?.id,
          currencyFormatter(currencies, record?.currency, record?.mainCurrency)
        );
      }
    },
    {
      title: "Account number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      width: "19%",
      // render: (_: void, record: BeneficiariesState) =>
      //   renderColumn(record?.id, record?.accountNumber)

      render: (_: void, record: BeneficiariesState) => {
        return (
          <div className={Styles["acc_no"]}>
            <Icon
              name="copy"
              onClick={() =>
                copy(record?.accountNumber ?? "", {
                  onCopy: Notification({
                    type: "success",
                    message: "Copied to clipboard."
                  })
                })
              }
            />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/beneficiary/summary/${record.id}`)}
            >
              {truncateString(record?.accountNumber)}
            </div>
          </div>
        );
      }
    },
    // {
    //   key: "country",
    //   title: "Country",
    //   dataIndex: "country",
    //   width: "19%",
    //   ellipsis: true,
    //   render: (_: void, record: BeneficiariesState) =>
    //     renderColumn(record?.id, getName(record?.country ?? ""))
    // },
    {
      key: "Status",
      title: "Status",
      dataIndex: "status",
      width: "18%",
      fixed: "right",
      render: (_: void, record: BeneficiariesState) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/beneficiary/summary/${record.id}`)}
        >
          <Status status={record?.status ?? ""} />
        </div>
      )
    },
    {
      key: "action",
      title: "",
      dataIndex: "action",
      width: "6%",
      fixed: "right",
      render: (_: void, record: BeneficiariesState) => (
        <Tooltip text={"Delete Beneficiary"}>
          <Icon
            name="delete"
            color={Colors.grey.neutral500}
            onClick={() => {
              setShowDeleteBeneModal(true);
              setSelectedBene({
                beneName: record?.nameOnAccount,
                beneId: record?.id
              });
            }}
          />
        </Tooltip>
      )
    }
  ];

  const renderColumn = (id: string | undefined, value: string | undefined) => {
    return (
      <div
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer"
        }}
        onClick={() => navigate(`/beneficiary/summary/${id}`)}
      >
        {value}
      </div>
    );
  };

  const totalBenesLength = beneNextToken
    ? allBenes?.length + 10
    : allBenes?.length;
  // const hasMoreToScroll =
  //   beneNextToken && beneData?.GetBeneficiaries?.nextToken ? true : false;
  const infiniteLoader =
    hasScrollActive && beneNextToken && allBenes.length > 10 ? true : false;
  const tableLoader =
    beneSearchLoading || (!allBenes.length && allBenesLoading);

  return (
    <PageWrapper>
      <HeaderWrapper
        loading={allBenesLoading}
        isFiltersActive={hasBeneFiltersActive}
        onClickHandler={() => showAddNewBeneModal()}
        onResetSearchCallback={() => resetFilters("ResetSearch")}
        onResetFiltersCallback={() => resetFilters("ResetAdvanceFilters")}
        onSubmitBeneFilters={onSubmit}
      />
      <TableWrapper>
        <InfiniteScroll
          style={{ maxHeight: "70vh" }}
          dataLength={totalBenesLength}
          next={() => beneNextToken && infiniteScrollHandler()}
          hasMore={false}
          loader={<Loader loading={infiniteLoader} />}
          scrollThreshold="60%"
          scrollableTarget="benesScrollDiv" // style={{ height: "auto", overflow: "none" }}
        >
          <Spin loading={tableLoader}>
            <div className={Styles["ds__table"]}>
              <Table
                id="benesScrollDiv"
                key={"beneficiary-table"}
                sticky
                rowKey={(record) =>
                  `${record.id}${record?.accountDetails?.accountNumber}`
                }
                dataSource={allBenes}
                tableColumns={columns}
                pagination={false}
                scroll={{
                  x: allBenes?.length && environment ? 699 : undefined
                }}
              />
            </div>
          </Spin>
        </InfiniteScroll>
      </TableWrapper>
      <AddNewBene
        show={showNewBeneModal}
        toggleShow={() => setShowNewBeneModal(false)}
      />
      <DeleteBeneficiary
        show={showDeleteBeneModal}
        beneId={selectedBene?.beneId}
        beneName={selectedBene?.beneName}
        toggleShow={() => setShowDeleteBeneModal(false)}
        callBackOnBeneDelete={() =>
          beneSearchText ? getSearchedBenes() : getBenes()
        }
      />
    </PageWrapper>
  );
};

export { Beneficiaries };
