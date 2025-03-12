import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os títulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";

function ListSalas() {
  const [salas, setSalas] = useState([]);

  async function getSalas() {
    // Chamada da API
    await api.getSalas().then(
      (response) => {
        console.log(response.data.classrooms);
        setSalas(response.data.classrooms);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const listSalas = salas.map((sala, index) => {
    // Adicionando a alternância de cor de fundo para as linhas
    const backgroundColor = index % 2 === 0 ? "#FFFFFF" : "#FA8887"; // Branco para linhas pares, vermelho claro para ímpares
    return (
      <TableRow key={sala.id_sala} sx={{ backgroundColor }}>
        <TableCell sx={{ textAlign: "center", padding: "16px" }}>{sala.number}</TableCell>
        <TableCell sx={{ textAlign: "center", padding: "16px" }}>{sala.description}</TableCell>
        <TableCell sx={{ textAlign: "center", padding: "16px" }}>{sala.capacity}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "16px", color: "#FF0000", fontFamily: 'sans-serif', fontWeight: 'bold'}}>
        SALAS DE AULA
      </h2>
      <TableContainer component={Paper} sx={{ marginTop: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f44336", color: "#fff", fontWeight: "bold" }}>
            <TableRow>
              <TableCell sx={{ textAlign: "center", padding: "16px" }}>Número</TableCell>
              <TableCell sx={{ textAlign: "center", padding: "16px" }}>Descrição</TableCell>
              <TableCell sx={{ textAlign: "center", padding: "16px" }}>Capacidade</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{listSalas}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListSalas;
