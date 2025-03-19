import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Salas from "./pages/Salas";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/salas"
            element={
              <ProtectedRoute>
                <Salas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Router>
  );
}

export default App;
