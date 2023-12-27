import { MFE_ROUTE_NAMESPACE, ROUTES } from "./RoutesEnum";

type URlPaths = `/${typeof MFE_ROUTE_NAMESPACE}${ROUTES}`;

const getRouteUrlWithNamespace = (ROUTE: ROUTES): URlPaths => {
  return `/${MFE_ROUTE_NAMESPACE}${ROUTE}`;
};

export { getRouteUrlWithNamespace };
