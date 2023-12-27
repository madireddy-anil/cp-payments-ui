import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@payconstruct/orbital-auth-provider";

export enum Permissions {
  ccRead = "cc:user-read",
  ccWrite = "cc:user-write",
  efxRead = "efx:user-read",
  efxWrite = "efx:user-write",
  paymentsRead = "payments:user-read",
  paymentsWrite = "payments:user-write",
  userManagementRead = "user-management:user-read",
  userManagementWrite = "user-management:user-write"
}

const useCheckPermissions = () => {
  const {
    permissions = [],
    userRole = "viewer",
    isAuthenticated,
    orgId
  } = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(true);

  const hasPermission = useCallback(
    (permission: Permissions) => {
      return permissions.includes(permission);
    },
    [permissions]
  );

  useEffect(() => {
    if (permissions.length > 0 && isAuthenticated && !!orgId) {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);
  }, [permissions, isAuthenticated, orgId]);

  return {
    hasPermission,
    userRole: userRole,
    isFetching
  };
};

export { useCheckPermissions };
