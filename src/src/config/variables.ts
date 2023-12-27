export const environment = process.env.ENVIRONMENT || "tst";
export const appUrl = process.env.URL;
export const auth0Domain = process.env.AUTH0_DOMAIN || "";
export const auth0ClientId = process.env.AUTH0_CLIENT_ID || "";
export const auth0Audience = process.env.AUTH0_AUDIENCE;
export const auth0Scope = process.env.AUTH0_SCOPE;
export const auth0Redirection = process.env.AUTH0_REDIRECTION_URL;
export const userManagementAPI = process.env.CC_MANAGEMENT_API_URL;
export const logoutUrl = process.env.REACT_APP_LOGOUT_URL || "";
export const revokeTokenUrl = process.env.AUTH0_REVOKE_TOKEN_API_URL;
export const userMetaData = "https://app.eu.payconstruct.com/user_metadata";
export const graphQHttpUrl = process.env.GRAPHQL_HTTP_URL || "";
export const graphQlWebsocketUrl = process.env.GRAPHQL_WEBSOCKET_URL || "";
export const region = process.env.REGION || "eu-west-1";
export const LTRLanguages = ["ar-AA"];
export const bmsUrl = process.env.BMS_URL;
export const contextKey = process.env.CONTEXT_STORAGE_KEY;
export const cryptoCurrencies = [
  "TST",
  "TBTC",
  "TETH",
  "ETH",
  "BTC",
  "LTC",
  "BCH",
  "USDT",
  "USDC",
  "TRX",
  "SOL"
];
export const cyAuthUserName =
  process.env.CY_USER_NAME || "cp-tst@getorbital.com";
export const cyAuthUserPassword = process.env.CY_USER_PASSWORD || "orbit@1234";
