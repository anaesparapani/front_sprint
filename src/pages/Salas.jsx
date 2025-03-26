import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
    //alternância de cor de fundo para as linhas
    const backgroundColor = index % 2 === 0 ? "#FFD9D9" : "#FFFFFF"; // se a linha for par será rosa claro, se for impar - branco
    return (
      //para garantir que cada linha seja única e tenha uma chave identificadora
      <TableRow key={sala.id_sala} sx={{ backgroundColor }}> 
        <TableCell
          sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}
        >
          {sala.number}
        </TableCell>
        <TableCell
          sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}
        >
          {sala.description}
        </TableCell>
        <TableCell
          sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}
        >
          {sala.capacity}
        </TableCell>
      </TableRow>
    );
  });

  {/*faz a requisição para a API*/}
  useEffect(() => {
    getSalas();
  }, []);

  return (
    <div>
      {salas.length === 0 ? ( //? = após a '?' é true
        <p>Carregando salas</p>
      ) : (
        //após os ':' é false
        <div>
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
            Salas de Aula
          </h2>
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
              {/*estilização do cabeçalho */}
              <TableHead
                sx={{
                  backgroundColor: "#ff6347",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      padding: "16px",
                      fontSize: "18px",
                    }}
                  >
                    Número
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      padding: "16px",
                      fontSize: "18px",
                    }}
                  >
                    Descrição
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      padding: "16px",
                      fontSize: "18px",
                    }}
                  >
                    Capacidade
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listSalas}</TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ListSalas;
