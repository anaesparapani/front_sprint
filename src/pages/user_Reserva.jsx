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
import HomeIcon from "@mui/icons-material/Home";

function UserReserva() {
  const [reservas, setReservas] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    async function fetchReservas() {
      try {
        const response = await api.getSchedulesByUser(userId);
        const dados = response.data.reservas ?? [];
        setReservas(dados);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        setReservas([]);
      }
    }

    fetchReservas();
  }, [userId]);

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      try {
        await api.delete(`/schedules/${id}`);
        setReservas(reservas.filter((res) => res.id_schedule !== id));
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        alert("Erro ao excluir reserva.");
      }
    }
  }

  return (
    <Box
      sx={{
        backgroundImage: "url(/Imagem_de_fundo.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        px: 2,
        py: 6,
        color: "white",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontStyle: "italic",
          position: "absolute",
          top: 20,
          left: 20,
          fontSize: 40,
          color: "white",
          fontFamily: "'Arial Black', sans-serif",
        }}
      >
        SENAI
      </Typography>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
        onClick={() => navigate("/home")}
      >
        <HomeIcon style={{ fontSize: 32 }} />
      </div>

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 6,
        }}
      >
        Minhas Reservas
      </Typography>

      {reservas.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {reservas.map((schedule) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={schedule.id_schedule}>
              <Card
                sx={{
                  backgroundColor: "#FF9F9F",
                  borderRadius: 3,
                  boxShadow: 3,
                  px: 2,
                  py: 1,
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Sala: {schedule.fk_number}
                  </Typography>
                  <Typography fontSize={14}>
                    Início: {schedule.inicio_periodo}
                  </Typography>
                  <Typography fontSize={14}>
                    Fim: {schedule.fim_periodo}
                  </Typography>
                  <Typography fontSize={14}>
                    Descrição: {schedule.descricao}
                  </Typography>

                  <Box mt={2}>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#FF5454",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#FF9F9F",
                        },
                      }}
                      onClick={() => handleDelete(schedule.id_schedule)}
                    >
                      EXCLUIR
                    </Button>
                  </Box>
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
            fontSize: "1rem",
          }}
        >
          Fazer novas reservas
        </Button>
      </Box>
    </Box>
  );
}

export default UserReserva;
