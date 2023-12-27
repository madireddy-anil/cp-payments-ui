import { Button } from "@payconstruct/design-system";
import { AuthContext } from "@payconstruct/orbital-auth-provider";
import { logoutUrl } from "config/variables";
import React, { useContext } from "react";
import { Route, Link, Outlet } from "react-router-dom";

/**
 * Public route component that render children components
 * @returns
 */
export const PublicRoute = () => {
  return (
    <Route path="/" element={<Navigation />}>
      <Outlet />;
    </Route>
  );
};

/**
 * Route with a navigation component together, you can have a menu and the main page rendered
 * @returns
 */
export const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home MFE</Link>
      <br />
      <Link to="/about">Your Public Route</Link>
      <br />
      <Link to="/example">PRIVATE: Example Page</Link>
      <br />
      <Link to="/payments">PRIVATE: Payments Dashboard</Link>
      <br />
      <Outlet />
      <br />
      {isAuthenticated && (
        <Button
          label="Logout Me"
          type="primary"
          onClick={() => logout({ returnTo: logoutUrl })}
        />
      )}
    </div>
  );
};
