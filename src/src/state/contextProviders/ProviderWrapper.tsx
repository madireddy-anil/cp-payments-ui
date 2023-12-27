import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, ErrorHandler } from "pages/Error/ErrorHandler";
import { AsyncIntlProvider } from "./intl/IntlProvider";
import { ApolloProvider } from "state/contextProviders/apollo/ApolloProvider";
import PaymentsProvider from "pages/Payments/PaymentsContext/PaymentsProvider";

const ProviderWrapper: React.FC = ({ children }) => {
  return (
    <ApolloProvider>
      <PaymentsProvider>
        <AsyncIntlProvider>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={ErrorHandler}
            onReset={() => {
              console.log("Reset?");
            }}
          >
            {children}
          </ErrorBoundary>
        </AsyncIntlProvider>
      </PaymentsProvider>
    </ApolloProvider>
  );
};

export { ProviderWrapper };
