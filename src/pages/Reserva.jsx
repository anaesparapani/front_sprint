import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";

export default function CriarReserva() {
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [sala, setSala] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReserva = async () => {
    if (!descricao || !data || !horaInicio || !horaFim || !sala) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const dadosReserva = {
      fk_id_usuario: 1,
      descricao,
      inicio_periodo: `${data} ${horaInicio}`,
      fim_periodo: `${data} ${horaFim}`,
      fk_number: sala,
    };

    try {
      setLoading(true);
      const response = await sheets.postReserva(dadosReserva);
      alert(response.data.message);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao reservar sala:", error);
      alert("Não foi possível realizar a reserva.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setDescricao("");
    setData("");
    setHoraInicio("");
    setHoraFim("");
    setSala("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        style={{
          padding: "20px",
          borderRadius: 10,
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="#B22222"
          fontFamily="revert-layer"
          style={{ marginBottom: "30px" }}
        >
          Reserva de Sala
        </Typography>

        <TextField
          label="Descrição"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Data"
          fullWidth
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <TextField
            label="Início"
            type="time"
            fullWidth
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Término"
            type="time"
            fullWidth
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <TextField
          label="Número da Sala"
          fullWidth
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleReserva}
          disabled={loading}
          style={{
            backgroundColor: "#e03a67",
            color: "#fff",
            marginTop: "16px",
            marginBottom: "10px",
          }}
        >
          {loading ? "Reservando..." : "Reservar"}
        </Button>
      </Paper>
    </div>
  );
}
