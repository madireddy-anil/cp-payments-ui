import React from "react";
import { Text } from "@payconstruct/design-system";

import styles from "./Tabs.module.css";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <Text number={20} weight="bold">
        Payments
      </Text>
    </div>
  );
};

export { Header };
