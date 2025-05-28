import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import api from "../axios/axios";

function UserReserva() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // ajuste conforme sua lógica

  useEffect(() => {
    async function fetchReservas() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.getAllSchedules(userId);
        setReservas(response.data.schedules);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    }

    fetchReservas();
  }, [userId]);

  return (
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: "100px", // espaço abaixo da logo
        color: "white",
      }}
    >
      {/* Logo SENAI fixa no topo */}
      <Typography
        variant="h4"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontWeight: "bold",
          color: "white",
          fontSize: "36px",
          letterSpacing: "3px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        SENAI
      </Typography>

      {/* Título centralizado */}
      <Typography
        variant="h5"
        style={{
            fontWeight: "bold",
            marginTop: "80px",
            marginBottom: "30px",
        }}
      >
        Minhas Reservas
      </Typography>

      {/* Lista de reservas */}
      {reservas.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 3,
            padding: 3,
            maxWidth: 600,
            margin: "auto",
            color: "#000",
          }}
        >
          <List>
            {reservas.map((reserva, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Sala: ${reserva.sala}`}
                  secondary={`Data: ${reserva.data} - Horário: ${reserva.horario}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography
          variant="body1"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Você ainda não possui reservas.
        </Typography>
      )}

      {/* Botão voltar */}
      <Box mt={4} textAlign="center">
        <Button
          onClick={() => navigate("/reserva")}
          variant="contained"
          style={{
            backgroundColor: "#f44336",
            color: "white",
            fontWeight: "bold",
            borderRadius: 10,
            padding: "10px 20px",
          }}
        >
          Fazer nova Reserva
        </Button>
      </Box>
    </div>
  );
}

export default UserReserva;
