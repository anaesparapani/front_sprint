import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"; // Importação de componentes do Material UI
import api from "../axios/axios"; // Importação do arquivo API para fazer requisições
import { Link } from "react-router-dom"; // Importação do Link para navegação

export default function SalasDisponiveis() {
  // Estados principais
  const [salas, setSalas] = useState([]); // Armazena as salas buscadas da API
  const [loading, setLoading] = useState(true); // Indica se os dados ainda estão carregando
  const [modalVisible, setModalVisible] = useState(false); // Controla a visibilidade do modal de horários

  // Armazena a sala atualmente selecionada
  // estado inicial é null, porque não tem sala selecionada
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [dataDigitada, setDataDigitada] = useState(""); // Data que o usuário digita para ver horários disponíveis
  const [horarios, setHorarios] = useState([]); // Horários disponíveis retornados da API

  // Busca todas as salas assim que o componente for montado
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await api.getSalas(); // Requisição para buscar salas
        setSalas(response?.data?.classrooms || []); // Armazena as salas na variável de estado
      } catch (error) {
        console.log("Erro ao buscar salas:", error); // Tratamento de erro
      } finally {
        setLoading(false); // Finaliza o carregamento, com ou sem sucesso
      }
    };
    fetchSalas(); // Chama a função que faz a requisição
  }, []); // O array vazio significa que a requisição será feita uma única vez, quando o componente for montado

  // Função que busca os horários disponíveis da sala selecionada para uma data
  const fetchHorarios = async () => {
    // Só faz a requisição se tiver data e a sala selecionada
    if (!dataDigitada || !salaSelecionada) return; // Impede requisição se faltar dados

    // Validação para bloquear datas passadas
    const hoje = new Date();
    const dataSelecionada = new Date(dataDigitada + "T00:00:00");

    // Se a data for anterior a hoje, exibe um alerta e interrompe a execução
    if (dataSelecionada < new Date(hoje.toDateString())) {
      alert("Não é possível visualizar horários para datas passadas.");
      // Esse return impede que a função continue se a data escolhida já tiver passado
      return;
    }

    try {
      // Requisição para buscar os horários
      const response = await api.getHorariosDisponiveisPorSalaEData(
        salaSelecionada.number,
        dataDigitada
      );
      // Tenta pegar os horários disponíveis da resposta da API
      // Se conseguir, se time_slots existir, ele salva isso no estado horarios.
      //Se não conseguir, se response, data ou time_slots for undefined, ele salva uma lista vazia [] no lugar.
      //time_slots = lista de horários disponíveis para uma sala e data escolhidas. (Intervalos de tempo disponíveis)
      setHorarios(response?.data?.time_slots || []);
    } catch (error) {
      console.log("Erro ao buscar horários:", error); // Tratamento de erro
    }
  };

  return (
  <>
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    </div>

    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "#B22222",
          fontWeight: "bold",
          fontSize: "36px",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        Salas Disponíveis
      </Typography>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <CircularProgress />
          <p>Carregando salas...</p>
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#FFCCCB",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#ff6347" }}>
              <TableRow>
                {["Nome da Sala", "Descrição", "Capacidade", "Horários"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {salas.map((sala, index) => (
                <TableRow
                  key={sala.number}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#FFD9D9" : "#FFFFFF",
                  }}
                >
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {sala.number}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {sala.description}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {sala.capacity}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#ff6347", fontWeight: "bold" }}
                      onClick={() => {
                        setSalaSelecionada(sala);
                        setModalVisible(true);
                        setHorarios([]);
                        setDataDigitada("");
                      }}
                    >
                      ⏱
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: 500,
            margin: "100px auto",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Sala {salaSelecionada?.number}{" "}
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Digite a data (YYYY-MM-DD)"
            value={dataDigitada}
            onChange={(e) => setDataDigitada(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            sx={{ backgroundColor: "#e03a67", fontWeight: "bold" }}
            fullWidth
            onClick={fetchHorarios}
          >
            Ver horários disponíveis
          </Button>

          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Horários disponíveis:
          </Typography>

          <Box sx={{ maxHeight: 300, overflowY: "auto", marginBottom: 2 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {horarios.map((hora, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link
                          to={`/reserva`}
                          style={{
                            textDecoration: "none",
                            color: "blue",
                          }}
                        >
                          {`${hora.start_time} - ${hora.end_time}`}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={() => setModalVisible(false)}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </div>
  </>
    )
  }
