import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import api from "../axios/axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserReserva() {
  const [reservas, setReservas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentReserva, setCurrentReserva] = useState(null);
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

  function handleEdit(reserva) {
    console.log("Reserva selecionada para edição:", reserva);
    setCurrentReserva({ ...reserva });
    setOpenModal(true);
  }

  async function handleUpdate() {
    try {
      await api.put(`/schedule/${currentReserva.id_schedule}`, {
        id_schedule: currentReserva.id_schedule,
        fk_id_usuario: Number(userId),
        descricao: currentReserva.descricao || "",
        inicio_periodo: currentReserva.inicio_periodo,
        fim_periodo: currentReserva.fim_periodo,
        fk_number: currentReserva.fk_number,
      });

      alert("Reserva atualizada com sucesso!");
      setOpenModal(false);
      setReservas((prev) =>
        prev.map((res) =>
          res.id_schedule === currentReserva.id_schedule ? currentReserva : res
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
      alert("Erro ao atualizar reserva.");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      try {
        await api.delete(`/schedule/${id}`);
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
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "100px",
        color: "white",
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ position: "absolute", top: 20, left: 20, fontWeight: "bold" }}
      >
        SENAI
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mt: 8, mb: 4, textAlign: "center" }}
      >
        Minhas Reservas
      </Typography>

      {reservas.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {reservas.map((schedule) => (
            <Grid item xs={12} sm={6} md={3} key={schedule.id_schedule}>
              <Card
                sx={{
                  bgcolor: "rgba(255, 201, 201, 0.95)",
                  color: "#000",
                  borderRadius: 3,
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Sala: {schedule.fk_number}
                  </Typography>
                  <Typography>Início: {schedule.inicio_periodo}</Typography>
                  <Typography>Fim: {schedule.fim_periodo}</Typography>
                  <Typography>Descrição: {schedule.descricao}</Typography>

                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(schedule.id_schedule)}
                    >
                      Excluir
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEdit(schedule)}
                    >
                      Editar
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
          }}
        >
          Fazer nova Reserva
        </Button>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            width: 400,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Editar Reserva</Typography>

          <TextField
            label="Descrição"
            value={currentReserva?.descricao || ""}
            onChange={(e) =>
              setCurrentReserva({
                ...currentReserva,
                descricao: e.target.value,
              })
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              value={
                currentReserva?.data
                  ? dayjs(currentReserva.data)
                  : currentReserva?.inicio_periodo
                  ? dayjs(currentReserva.inicio_periodo.split("T")[0])
                  : null
              }
              onChange={(newValue) => {
                const novaData = newValue?.format("YYYY-MM-DD") || "";
                setCurrentReserva({
                  ...currentReserva,
                  data: novaData,
                });
              }}
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                },
              }}
            />
          </LocalizationProvider>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Início"
              type="time"
              fullWidth
              value={
                currentReserva?.horaInicio ||
                (currentReserva?.inicio_periodo
                  ? dayjs(currentReserva.inicio_periodo).format("HH:mm")
                  : "")
              }
              onChange={(e) =>
                setCurrentReserva({
                  ...currentReserva,
                  horaInicio: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Término"
              type="time"
              fullWidth
              value={
                currentReserva?.horaFim ||
                (currentReserva?.fim_periodo
                  ? dayjs(currentReserva.fim_periodo).format("HH:mm")
                  : "")
              }
              onChange={(e) =>
                setCurrentReserva({
                  ...currentReserva,
                  horaFim: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <TextField
            label="Número da Sala"
            type="text"
            value={currentReserva?.fk_number || ""}
            onChange={(e) =>
              setCurrentReserva({
                ...currentReserva,
                fk_number: e.target.value,
              })
            }
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Junta data e horas em inicio_periodo e fim_periodo
                const inicio = `${currentReserva.data} ${currentReserva.horaInicio}`;
                const fim = `${currentReserva.data} ${currentReserva.horaFim}`;
                handleUpdate({
                  ...currentReserva,
                  inicio_periodo: inicio,
                  fim_periodo: fim,
                });
              }}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default UserReserva;
