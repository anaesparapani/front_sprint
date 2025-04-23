import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ReservaSala() {
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para simular a reserva
  const handleReserva = async () => {
    if (!descricao || !dataInicio || !dataFim) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    setLoading(true);
    // Aqui você pode fazer a chamada à API para salvar a reserva
    setTimeout(() => {
      setLoading(false);
      alert("Reserva realizada com sucesso!");
      navigate("/disponibilidade"); // Redireciona após reserva
    }, 2000); // Simula o tempo de resposta da API
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
      {/* input branco no meio */}
      <Paper
        style={{
          padding: "20px",
          borderRadius: 10,
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Título acima do container */}
        <Typography 
          variant="h4" 
          align="center" 
          color="#B22222" 
          fontFamily="revert-layer" 
          style={{ marginBottom: "30px" }} // Espacamento maior entre título e campos
        >
          Reserva de Sala
        </Typography>

        {/* Descrição */}
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        {/* Data de Início */}
        <TextField
          label="Data de Início"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          InputLabelProps={{ shrink: true }} // Isso impede o encolhimento do label e melhora o layout
          style={{ marginBottom: "16px" }}
        />

        {/* Data de Fim */}
        <TextField
          label="Data de Fim"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          InputLabelProps={{ shrink: true }} // Isso impede o encolhimento do label e melhora o layout
          style={{ marginBottom: "16px" }}
        />

        {/* Botão de Reserva */}
        <Button
          variant="contained"
          backgroundColor="#e03a67"
          onClick={handleReserva}
          disabled={loading} // Desabilita o botão durante o processo de reserva
          fullWidth
        >
          {loading ? "Reservando..." : "Reservar"}
        </Button>
      </Paper>
    </div>
  );
}

export default ReservaSala;
