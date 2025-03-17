import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../axios/axios";

function Login() {
  const [user, setUser] = useState({
    cpf: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    try {
      const response = await api.postLogin(user);
      alert(response.data.message);
    } catch (error) {
      console.error(err);
      alert(error.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
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
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <CssBaseline />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            component="h1"
            variant="h5"
            style={{ color: "#d40000", fontWeight: "bold", marginBottom: 10 }}
          >
            LOGIN
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              style={{
                backgroundColor: "#d40000",
                color: "white",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              ENTRAR
            </Button>

            <Button
              component={Link}
              to="/cadastro"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d40000",
                color: "white",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              CADASTRE-SE
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
