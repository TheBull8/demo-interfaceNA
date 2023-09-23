import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import "./style.css";

import QueryComponent from "./pages/query-component";
import ChatComponent from "./pages/chat-component";
import DrawComponent from "./pages/draw-component";
import LoginComponent from "./pages/login-component";
import Layout from "./components/layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<QueryComponent />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/draw" element={<DrawComponent />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export function renderToDom(container) {
  createRoot(container).render(
    <Auth0Provider
      domain="dev-occ6rz7ckvddighe.us.auth0.com"
      clientId="k3iTHeEwJ0WvI6DFqhHaQdTcOW4K6iWa"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  );
}
