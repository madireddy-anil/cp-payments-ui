import React, { useContext, useMemo } from "react";
import { Colors, Tab } from "@payconstruct/design-system";
import { Header } from "./TabsHeader";
import { Payments } from "../Payments/Payments";
import { Beneficiaries } from "../Beneficiaries/Beneficiaries";
import { TabNameEnum } from "../../enums";
import { PaymentsContext } from "pages/Payments/PaymentsContext/PaymentsProvider";
import { SetSelectedTab } from "pages/Payments/PaymentsContext/PaymentsActions";

// interface TabsProps {
//   onNewBeneficiaryButtonClick: () => void;
// }

const Tabs: React.FC = () => {
  const {
    dispatch,
    state: { selectedTab }
  } = useContext(PaymentsContext);

  const onChangeTab = (tab: string) => {
    dispatch(SetSelectedTab(tab));
  };

  const Tabs = useMemo(() => {
    const tabs = [
      {
        id: TabNameEnum.Payments,
        key: TabNameEnum.Payments,
        title: "Payments History",
        content: selectedTab === TabNameEnum.Payments && <Payments />
      },
      {
        id: TabNameEnum.Beneficiaries,
        key: TabNameEnum.Beneficiaries,
        title: "Beneficiaries",
        content: selectedTab === TabNameEnum.Beneficiaries && <Beneficiaries />
      }
    ];
    return tabs;
  }, [selectedTab]);

  return (
    <>
      <Header />
      <Tab
        defaultActiveKey={selectedTab}
        initialpanes={Tabs}
        size="middle"
        tabposition="top"
        type="line"
        onChange={onChangeTab}
        tabbarstyle={{
          margin: 0,
          paddingLeft: "98px",
          backgroundColor: Colors.white.primary
        }}
      />
    </>
  );
};

export { Tabs };
