import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./index.css";
import { client } from "./lib/apollo";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      onError={() =>
        console.log("An error occured and catched with Error Boundary")
      }
    >
      <BrowserRouter>
        <ReduxProvider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ReduxProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
