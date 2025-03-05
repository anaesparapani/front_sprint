import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";

function listSalas() {
  const [salas, setSalas] = useState([]);

  async function getSalas() {
    //Chamada da Api
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

  const listSalas = salas.map((sala) => {
    return (
      <TableRow key={sala.id_sala}>
        <TableCell align="center">{sala.number}</TableCell>
        <TableCell align="center">{sala.description}</TableCell>
        <TableCell align="center">{sala.capacity}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <div>
      <h5>Lista de Salas</h5>
      <TableContainer component={Paper} style={{ margin: "2px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">Número</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Capacidade</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{listSalas}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default listSalas;
