import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import "./style.css";

import QueryComponent from "./pages/query-component";
import Layout from "./components/layout";
interface HoveredData {
  lat: number;
  lon: number;
  index: number;
}
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<QueryComponent  />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export function renderToDom(container) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
  createRoot(container).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  );
}
