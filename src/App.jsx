import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Salas from "./pages/Salas";
import ProtectedRoute from "./components/protectedRoute";
import Reserva from "./pages/Reserva";
import Perfil from "./pages/Perfil";
import UserReserva from "./pages/user_Reserva";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/salas"
          element={
            <ProtectedRoute>
              <Salas />
            </ProtectedRoute>
          }
        />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/UserReserva" element={<UserReserva />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
