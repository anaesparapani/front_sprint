import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../axios/axios";


function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    cpf: "",
    email: "",
    password: ""
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    try {
      const response = await api.postCadastro(user);
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  return (
    <div style={{
      backgroundImage:"url('/Imagem_de_fundo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img
        src="/logo-senai-1.png" // Altere o caminho da imagem conforme necessário
        alt="Imagem no topo"
        style={{
          position: "absolute",
          top: "-7%", // Ajuste a posição vertical conforme necessário
          left: "42%",
          width: "15%", // Ajuste o tamanho da imagem conforme necessário
          zIndex: 1, // Garante que a imagem fique acima do conteúdo
        }}
      />

      <Container component="main" maxWidth="xs" style={{ backgroundColor: "white", borderRadius: 20, padding: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5" style={{ color: "#d40000", fontWeight: "bold", marginBottom: 10 }}>
            CRIE SUA CONTA
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome"
              type="text"
              name="name"
              value={user.name}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="CPF"
              type="text"
              name="cpf"
              value={user.cpf}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-mail"
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#d40000", color: "white", fontWeight: "bold", marginTop: 10 }}
            >
              Cadastrar
            </Button>

            <Button
              component={Link}
              to="/"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#d40000", color: "white", fontWeight: "bold", marginTop: 10 }}
            >
              Já tem uma conta? Faça login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Cadastro;