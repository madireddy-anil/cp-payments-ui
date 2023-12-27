import React, { useMemo, useReducer } from "react";
import { ActionType } from "./PaymentsActions";
import { BeneReducer } from "./PaymentsReducer";
import { PaymentsState, PaymentsStateProps } from "./PaymentsState";
import { EncryptStorage } from "encrypt-storage";

export const PaymentsContext = React.createContext<{
  state: PaymentsStateProps;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: PaymentsState,
  dispatch: () => null
});

export interface ProviderProps {
  showFilters?: boolean;
}

const PaymentsProvider: React.FC<ProviderProps> = ({ children }) => {
  //* Not necessary to hide the key
  const encryptStorage = new EncryptStorage("payment-ui-key", {
    prefix: "@payment-ui-context"
  });

  const [state, dispatch] = useReducer(BeneReducer, {
    ...PaymentsState,
    ...encryptStorage.getItem("state")
  });

  const contextValue = useMemo(() => {
    encryptStorage.setItem("state", state);

    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <PaymentsContext.Provider value={contextValue}>
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsProvider;
