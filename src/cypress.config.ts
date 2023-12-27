import {
  cyAuthUserName,
  cyAuthUserPassword,
  graphQHttpUrl
} from "config/variables";
import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  videoCompression: false,
  integrationFolder: "cypress/integration",
  video: false,
  env: {
    username: cyAuthUserName,
    password: cyAuthUserPassword,
    graphqlUrl: graphQHttpUrl,
    baseUrl: "http://localhost:3001",
    organizationsUrl: "https://cc-api.tst.payperform.com/v1"
  }
});
