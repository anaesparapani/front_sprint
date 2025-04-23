import { useState, useEffect } from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, CircularProgress } from "@mui/material";
import api from "../axios/axios"; // Importa a instância do axios para fazer requisições à API
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação para redirecionar para outra página

function ListSalas() {
  // Estado para armazenar os dados das salas e o estado de carregamento
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true); // Inicialmente, assume que está carregando
  const navigate = useNavigate(); // Hook de navegação para redirecionamento

  // Função para obter as salas da API
  async function getSalas() {
    setLoading(true); // Ativa o estado de carregamento
    try {
      const response = await api.getSalas(); // Chama a API para buscar as salas
      setSalas(response.data.classrooms); // Atualiza o estado 'salas' com os dados recebidos da API
    } catch (error) {
      console.log("Erro ao carregar salas:", error); // Se houver erro, exibe no console
    } finally {
      setLoading(false); // Desativa o estado de carregamento após a resposta
    }
  }

  // Função para redirecionar o usuário para a página de disponibilidade
  const handleRowClick = (id_sala) => {
    navigate(`/disponibilidade`); // Redireciona para a página de disponibilidade com o id da sala
  };

  // Efetua a chamada à API assim que o componente for montado
  useEffect(() => {
    getSalas(); // Chama a função para obter as salas
  }, []); // O array vazio significa que o useEffect só será chamado uma vez, logo após a montagem do componente

  // Mapeia as salas para exibir cada linha na tabela
  const listSalas = salas.map((sala, index) => {
    // Alterna a cor de fundo da linha (rosa claro para linhas pares, branco para linhas ímpares)
    const backgroundColor = index % 2 === 0 ? "#FFD9D9" : "#FFFFFF";

    return (
      <TableRow
        key={sala.id_sala} // A chave única da linha é o id da sala
        sx={{ backgroundColor }} // Define a cor de fundo da linha
        onClick={() => handleRowClick(sala.id_sala)} // Ao clicar na linha, redireciona para a página de disponibilidade
        style={{ cursor: "pointer" }} // Indica que a linha é clicável
      >
        {/* Exibe o número da sala */}
        <TableCell sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}>
          {sala.number}
        </TableCell>
        {/* Exibe a descrição da sala */}
        <TableCell sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}>
          {sala.description}
        </TableCell>
        {/* Exibe a capacidade da sala */}
        <TableCell sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}>
          {sala.capacity}
        </TableCell>
      </TableRow>
    );
  });

  // Função para deslogar o usuário
  function logout() {
    localStorage.removeItem("authenticated"); // Remove a autenticação do localStorage
    navigate("/"); // Redireciona o usuário para a página de login
  }

  return (
    <div>
      {loading ? (
        // Exibe um indicador de carregamento enquanto as salas estão sendo carregadas
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress /> 
          <p>Carregando salas...</p>
        </div>
      ) : (
        // Exibe as salas na tabela após o carregamento
        <div>
          <h2
            style={{
              textAlign: "center", // Centraliza o título
              marginBottom: "16px", // Margem inferior
              color: "#B22222", // Cor vermelha do título
              fontFamily: "sans-serif", // Fonte sem serifa
              fontWeight: "bold", // Deixa o título em negrito
              fontSize: "36px", // Tamanho grande do título
            }}
          >
            Salas de Aula
          </h2>

          {/* Componente TableContainer para embutir a tabela dentro de um Paper (papel com fundo branco) */}
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 4, // Margem superior
              borderRadius: 2, // Bordas arredondadas
              boxShadow: 3, // Sombra ao redor do container
              backgroundColor: "#FFCCCB", // Cor de fundo clara
            }}
          >
            {/* Tabela que contém as salas */}
            <Table sx={{ minWidth: 650 }}>
              <TableHead
                sx={{
                  backgroundColor: "#ff6347", // Cor de fundo do cabeçalho
                  color: "#fff", // Cor do texto do cabeçalho (branco)
                  fontWeight: "bold", // Deixa o texto do cabeçalho em negrito
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center", // Centraliza o texto
                      padding: "16px", // Adiciona padding nas células
                      fontSize: "18px", // Tamanho da fonte no cabeçalho
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
              {/* Corpo da tabela, onde as salas são exibidas */}
              <TableBody>{listSalas}</TableBody>
            </Table>
          </TableContainer>

          {/* Botão de logout */}
          <Button
            fullWidth
            variant="contained"
            onClick={logout} // Chama a função de logout ao clicar
            style={{
              backgroundColor: "#e03a67", // Cor de fundo vermelha do botão
              color: "white", // Cor do texto branco
              fontWeight: "bold", // Texto em negrito
              marginTop: 10, // Espaço entre o botão e os outros elementos
            }}
          >
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListSalas;
