import React from "react";
import { PageNotFound } from "pages/4xx/404";
import { Example } from "pages/ExamplePage";
import { Payments } from "pages/Payments/Client/Payments";
import { PaymentDetails } from "pages/Payments/Client/PaymentDetails";
import { BeneficiaryDetails } from "pages/Payments/Client/BeneficiaryDetails";

interface RouteProps {
  path: string;
  title: string;
  exact?: boolean;
  element: () => JSX.Element;
}

type RoutesProps = RouteProps[];

const listOfPrivateRoutes = [
  {
    path: "*",
    exact: false,
    title: "Not Found",
    element: () => <PageNotFound />
  },
  {
    path: "/example",
    exact: true,
    title: "Example Page Title",
    element: () => <Example />
  },
  {
    path: "/payments",
    exact: true,
    title: "Payment details",
    element: () => <Payments />
  },
  {
    path: "/payment/summary/:id",
    parent: "/payments",
    exact: true,
    title: "Payment details",
    element: () => <PaymentDetails />
  },
  {
    path: "/beneficiary/summary/:id",
    parent: "/payments",
    exact: true,
    title: "Beneficiary details",
    element: () => <BeneficiaryDetails />
  }
] as RoutesProps;

export { listOfPrivateRoutes };
