import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './App.css';
import "./style.css"


import QueryComponent from './components/query-component';
import ChatComponent from './components/chat-component';
import DrawComponent from './components/draw-component';
import LoginComponent from './components/login-component';


export default function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<QueryComponent />} />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/draw" element={<DrawComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}