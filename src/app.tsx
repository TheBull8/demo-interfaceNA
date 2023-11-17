import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./App.css";
import "./style.css";

import QueryComponent from "./pages/query-component";
import ProfileEdit from "./pages/profile-edit";
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
          <Route path="/" element={<QueryComponent />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export function renderToDom(container) {
  const domain = dev-tq1jxx6guugo8l21.eu.auth0.com;
  const clientId = Nw4GucqiHi4PEkHcGpxdoSQWZr3oiQiz;
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
