import { useState, useEffect } from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Chip, CircularProgress } from "@mui/material";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";

function ConsultaDisponibilidadeSalas() {
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function consultarDisponibilidade() {
      try {
        const response = await api.getDisponibilidade();
        console.log("Dados recebidos da API:", response.data);
        if (response.data && response.data.length > 0) {
          const salasDisponiveis = response.data.filter(
            sala => sala.status?.toLowerCase() === "disponivel"
          );
          setDisponibilidade(salasDisponiveis);
        } else {
          console.log("Nenhuma disponibilidade encontrada.");
        }
      } catch (error) {
        console.error("Erro ao consultar disponibilidade: ", error);
      } finally {
        setLoading(false);
      }
    }
    consultarDisponibilidade();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <p>Carregando disponibilidade...</p>
      </div>
    );
  }

  const listSalas = disponibilidade.map((sala, index) => {
    const isDisponivel = sala.status === "disponível";
    const backgroundColor = index % 2 === 0 ? "#F9F9F9" : "#FFFFFF";

    return (
      <TableRow
        key={sala.id_sala}
        sx={{ backgroundColor }}
        onClick={() => navigate(`/disponibilidade/${sala.id_sala}`)}
        style={{ cursor: "pointer" }}
      >
        <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{sala.number}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{sala.description}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{sala.capacity}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Chip
            label={isDisponivel ? "Disponível" : "Ocupada"}
            color={isDisponivel ? "success" : "error"}
            sx={{ fontWeight: "bold" }}
          />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: '100%',
        paddingTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="/logo-senai-1.png"
        alt="Logo Senai"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "15%",
        }}
      />

      <div
        style={{
          width: "90%",
          maxWidth: "1100px",
          backgroundColor: "white",
          borderRadius: 20,
          padding: "20px 30px",
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "16px",
            color: "#B22222",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "36px",
          }}
        >
          Consulta de Disponibilidade de Salas
        </h2>

        <TableContainer component={Paper} sx={{ marginTop: 4, borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#FF7F7F", color: "white" }}>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Número</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Descrição</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Capacidade</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listSalas}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ConsultaDisponibilidadeSalas;
