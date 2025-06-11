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
  // Estado para armazenar as reservas do usuário
  const [reservas, setReservas] = useState([]);

  // Pegando o ID do usuário armazenado no navegador
  const userId = localStorage.getItem("userId");

  // Hook para redirecionar entre páginas
  const navigate = useNavigate();

  // Carrega as reservas do usuário assim que o componente for exibido
  useEffect(() => {
    if (!userId) return; // Se não houver usuário logado, sai da função

    // Função para buscar as reservas
    async function fetchReservas() {
      try {
        // Chamada à API
        const response = await api.getSchedulesByUser(userId);

        // Se vier resposta válida, usa os dados, senão usa lista vazia
        const dados = response.data.reservas ?? [];
        setReservas(dados); // Atualiza o estado com as reservas
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        setReservas([]); // Em caso de erro, limpa a lista
      }
    }

    fetchReservas(); // Chama a função para buscar as reservas
  }, [userId]);

  // Função para excluir uma reserva
  async function handleDelete(id) {
    // Confirmação com o usuário antes de excluir
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      try {
        // Chamada à API para deletar a reserva pelo ID
        await api.delete(`/schedules/${id}`);

        // Remove a reserva do id tal da lista
        setReservas(reservas.filter((res) => res.id_schedule !== id));
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        alert("Erro ao excluir reserva.");
      }
    }
  }

  // Renderização da interface
  return (
    <Box
      sx={{
        backgroundImage: "url(/Imagem_de_fundo.jpg)", // Imagem de fundo
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        px: 2,
        py: 6,
        color: "white",
        position: "relative",
      }}
    >
      {/* Logo SENAI */}
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

      {/* Botão para voltar à home */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
        onClick={() => navigate("/home")} // Vai para /home
      >
        <HomeIcon style={{ fontSize: 32 }} />
      </div>

      {/* Título da página */}
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

      {/* Verifica se há reservas */}
      {reservas.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {/* Para cada reserva um card */}
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
                  {/* Informações da reserva */}
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

                  {/* Botão para excluir reserva */}
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
        // Se não tem nenhuma reserva
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          Você ainda não possui reservas.
        </Typography>
      )}

      {/* Botão para fazer novas reservas */}
      <Box mt={6} textAlign="center">
        <Button
          onClick={() => navigate("/reserva")} // Vai para a página de nova reserva
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
