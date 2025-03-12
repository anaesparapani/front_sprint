import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

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
      console.error(error);
      alert(error.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
            name="cpf"
            id="cpf"
            value={user.cpf}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={onChange}
          />
          <Button
            component={Link}
            to="/salas"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/cadastro"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
