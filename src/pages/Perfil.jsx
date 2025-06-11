// Importações necessárias: API, React, componentes de UI e ícones
import api from "../axios/axios"; // Importa o arquivo de configuração da API
import React, { useEffect, useState } from "react"; // Hooks do React
import { useNavigate } from "react-router-dom"; // Para redirecionamento de rotas
import {
  TextField, Button, Box, Typography, CssBaseline
} from "@mui/material"; // Componentes visuais do Material UI
import PersonIcon from "@mui/icons-material/Person"; // Ícone de usuário
import DeleteIcon from "@mui/icons-material/Delete"; // Ícone de deletar
import HomeIcon from "@mui/icons-material/Home"; // Ícone de casa (voltar para home)

function Perfil() {
  const navigate = useNavigate(); // Hook para navegação de páginas
  const userId = localStorage.getItem("userId"); // Pega o ID do usuário salvo no navegador

  // Estado inicial do usuário (campos do formulário)
  const [user, setUser] = useState({
    id: "",
    name: "",
    cpf: "",
    email: "",
    password: "",
  });

  // useEffect é executado quando a página carrega (para buscar os dados do usuário)
  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!userId) return; // Se não houver ID, não busca nada

        // Faz o GET para pegar os dados do usuário
        const response = await api.get(`/user/${userId}`);
        const userData = response.data.user;

        // Atualiza os dados no estado que esta no banco de acordo com o id do user
        setUser({
          id: userId,
          name: userData.name || "",
          cpf: userData.cpf || "",
          email: userData.email || "",
          password: "******",
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    fetchUsuario(); // Chama a função
  }, [userId]); // Executa novamente se o userId mudar

  // Atualiza o estado quando algum campo do formulário for alterado
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Atualiza os dados do usuário na API
  const handleUpdate = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    try {
      const response = await api.updateUser(user.id, {
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
      });
      alert(response.data.message); // Mostra mensagem de sucesso
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error.response.data);
      alert("Erro ao atualizar os dados do usuário.");
    }
  };

  // Deleta o usuário (após confirmação)
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir sua conta?");
    if (!confirmDelete) return;

    try {
      const response = await api.deleteUser(user.id); // Chama a API para deletar
      alert(response.data.message);
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')", // Imagem de fundo
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Logo SENAI no canto superior esquerdo */}
      <Typography
        variant="h4"
        style={{
          fontStyle: "italic",
          position: "absolute",
          top: 20,
          left: 20,
          fontSize: 40,
          color: "white",
          fontWeight: 900,
          fontFamily: "'Arial Black', sans-serif",
          zIndex: 10,
        }}
      >
        SENAI
      </Typography>

      {/* Botão de voltar para a página Home */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
        onClick={() => navigate("/home")}
      >
        <HomeIcon style={{ fontSize: 32 }} />
      </div>

      {/* Card principal do perfil */}
      <Box
        style={{
          display: "flex",
          backgroundColor: "#ffeaea", // Cor clara de fundo
          borderRadius: "12px",
          width: "800px",
          padding: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Lado esquerdo com ícone e botão */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ width: "30%", marginRight: "20px" }}
        >
          <Box
            style={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "15px",
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <PersonIcon style={{ fontSize: 110, color: "#f28b8b" }} />
          </Box>

          {/* Botão para ver as reservas do usuário */}
          <Button
            onClick={() => navigate("/UserReserva")}
            style={{
              backgroundColor: "#f28b8b",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: "0.9rem",
              textTransform: "none",
            }}
          >
            Minhas Reservas
          </Button>
        </Box>

        {/* Formulário do lado direito */}
        <Box style={{ width: "70%" }}>
          <CssBaseline /> {/* Reseta o estilo base do MUI */}
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              color: "#f28b8b",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            MEU PERFIL
          </Typography>

          {/* Campos do formulário */}
          <TextField
            fullWidth
            placeholder="Nome:"
            name="name"
            value={user.name}
            onChange={onChange}
            style={{ marginBottom: 12, backgroundColor: "#fff", borderRadius: 8 }}
          />
          <TextField
            fullWidth
            placeholder="CPF:"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
            style={{ marginBottom: 12, backgroundColor: "#fff", borderRadius: 8 }}
          />
          <TextField
            fullWidth
            placeholder="E-mail:"
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
            style={{ marginBottom: 12, backgroundColor: "#fff", borderRadius: 8 }}
          />
          <TextField
            fullWidth
            placeholder="Senha:"
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
            style={{ marginBottom: 20, backgroundColor: "#fff", borderRadius: 8 }}
          />

          {/* Botões de ação */}
          <Box display="flex" justifyContent="space-between">
            <Button
              type="submit"
              onClick={handleUpdate}
              style={{
                backgroundColor: "#e60000",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: 10,
                fontWeight: "bold",
                flex: 1,
                marginRight: 10,
              }}
            >
              Atualizar
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              style={{
                backgroundColor: "#e60000",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: 10,
                fontWeight: "bold",
                flex: 1,
              }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Perfil;
