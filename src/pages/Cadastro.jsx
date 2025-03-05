import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Cadastro() {
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          CADASTRE-SE
        </Typography>

        <Box component="form" noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
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
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            <Link to="/">Já tem uma conta? Faça login</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
