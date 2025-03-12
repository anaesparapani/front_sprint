import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Cadastro() {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    password: "",
    name: "",
    data_nascimento: "",
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
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          CADASTRE-SE
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
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
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cadastrar
          </Button>

          <Button
            component={Link}
            to="/"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Já tem uma conta? Faça login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
