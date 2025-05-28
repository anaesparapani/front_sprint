import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import api from "../axios/axios";

function UserReserva() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await api.getAllSchedules(userId);
        setReservas(response.data.schedules);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    }
    fetchReservas();
  }, [userId]);

  return (
    <Box
      sx={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: "100px",
        color: "white",
        px: 2,
      }}
    >
      {/* Logo SENAI fixa no topo */}
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          fontWeight: "bold",
          color: "white",
          fontSize: 36,
          letterSpacing: 3,
          fontFamily: "Arial, sans-serif",
        }}
      >
        SENAI
      </Typography>

      {/* Título centralizado */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mt: 8,
          mb: 4,
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        Minhas Reservas
      </Typography>

      {/* Grades de reservas */}
      {reservas.length > 0 ? (
        <Grid
  container
  spacing={4}  // aumentei o espaçamento entre os cards
  justifyContent="center"
  sx={{ maxWidth: 900, margin: "0 auto" }}
>
  {reservas.map((schedule, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}   // deixei 3 colunas no desktop para os cards ficarem menores
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center", // centraliza o card dentro do grid item
      }}
    >
      <Card
        sx={{
          bgcolor: "rgba(255, 201, 201, 0.95)",
          color: "#000",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(255, 182, 182, 0.3)",
          maxWidth: 220,    // limitei a largura máxima para deixar menor
          width: "100%",    // para o card ocupar o espaço do grid item até 220px
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sala: {schedule.fk_number}
          </Typography>
          <Typography variant="body1">
            Início: {schedule.inicio_periodo}
          </Typography>
          <Typography variant="body1" mb={1}>
            Fim: {schedule.fim_periodo}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          Você ainda não possui reservas.
        </Typography>
      )}

      {/* Botão voltar */}
      <Box mt={6} textAlign="center">
        <Button
          onClick={() => navigate("/reserva")}
          variant="contained"
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Fazer nova Reserva
        </Button>
      </Box>
    </Box>
  );
}

export default UserReserva;
