// Importa o React e o hook useState do pacote React.
import React, { useState } from "react";

// Importa componentes de UI do Material-UI.
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

// Importa o hook useNavigate para navegação de rotas no React Router.
import { useNavigate } from "react-router-dom";

// Importa a instância configurada do axios para realizar requisições HTTP.
import sheets from "../axios/axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Função componente principal chamada CriarReserva.
export default function CriarReserva() {
  // Declara os estados locais para armazenar os valores dos inputs do formulário.
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [sala, setSala] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook para redirecionamento de páginas.
  const navigate = useNavigate();

  // Função para lidar com a tentativa de criar uma reserva.
  const handleReserva = async () => {
    // Verifica se todos os campos obrigatórios foram preenchidos.
    if (!descricao || !data || !horaInicio || !horaFim || !sala) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Cria um objeto com os dados da reserva.
    const dadosReserva = {
      fk_id_usuario: parseInt(localStorage.getItem("userId")), // ID real do usuário
      descricao, // Descrição da reserva.
      inicio_periodo: `${data} ${horaInicio}`, // Data e hora de início concatenadas.
      fim_periodo: `${data} ${horaFim}`, // Data e hora de término concatenadas.
      fk_number: sala, // Número da sala.
    };

    try {
      // Define o estado de loading como true durante o envio da requisição.
      setLoading(true);
      // Envia a requisição POST para criar a reserva usando o serviço sheets.
      const response = await sheets.postReserva(dadosReserva);
      // Exibe a mensagem de resposta.
      alert(response.data.message);
      // Retorna para a página anterior.
      navigate(-1);
    } catch (error) {
      // Exibe erro no console e alerta em caso de falha na requisição.
      console.error("Erro ao reservar sala:", error);
      alert("Não foi possível realizar a reserva.");
    } finally {
      // Reseta o estado de loading para false após a tentativa.
      setLoading(false);
    }
  };

  // Função para limpar todos os campos do formulário.
  const handleCancelar = () => {
    setDescricao("");
    setData("");
    setHoraInicio("");
    setHoraFim("");
    setSala("");
  };

  // Retorna a interface do componente.
  return (
    <div
      // Estilo inline para centralizar o conteúdo vertical e horizontalmente, com imagem de fundo.
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
        // Componente Paper do Material-UI com padding e estilo de card semi-transparente.
        style={{
          padding: "20px",
          borderRadius: 10,
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <Typography
          // Título principal da página.
          variant="h4"
          align="center"
          color="#B22222"
          fontFamily="revert-layer"
          style={{ marginBottom: "30px" }}
        >
          Reserva de Sala
        </Typography>

        {/* Campo de texto para descrição da reserva */}
        <TextField
          label="Descrição"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
        />

        {/* Campo de seleção de data */}
        

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Data"
    value={data ? dayjs(data) : null}
    onChange={(newValue) => setData(newValue?.format('YYYY-MM-DD'))}
    format="YYYY-MM-DD"
    slotProps={{
      textField: {
        fullWidth: true,
        margin: 'normal'
      }
    }}
  />
</LocalizationProvider>


        {/* Div para agrupar os campos de hora */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          {/* Campo para hora de início */}
          <TextField
            label="Início"
            type="time"
            fullWidth
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          {/* Campo para hora de término */}
          <TextField
            label="Término"
            type="time"
            fullWidth
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        {/* Campo para inserir o número da sala */}
        <TextField
          label="Número da Sala"
          fullWidth
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          margin="normal"
        />

        {/* Botão para enviar a reserva */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleReserva}
          disabled={loading} // Desativa o botão durante a requisição.
          style={{
            backgroundColor: "#e03a67",
            color: "#fff",
            marginTop: "16px",
            marginBottom: "10px",
          }}
        >
          {/* Altera o texto do botão dependendo do estado de loading */}
          {loading ? "Reservando..." : "Reservar"}
        </Button>
      </Paper>
    </div>
  );
}
