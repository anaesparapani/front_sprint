import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, CssBaseline } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../axios/axios";

function Perfil() {
  const [user, setUser] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await api.updateUser(user); // Assuma que essa função está configurada na sua API
      alert("Usuário atualizado com sucesso!");
      console.log(response);
    } catch (error) {
      alert("Erro ao atualizar usuário.");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteUser(user.id); // ou `user.id` dependendo de como você faz isso
      alert("Conta excluída com sucesso.");
      navigate("/");
    } catch (error) {
      alert("Erro ao excluir a conta.");
      console.log(error);
    }
  };

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
      {/* Logo SENAI */}
      <img
        src="/logo-senai-1.png"
        alt="Logo SENAI"
        style={{
          position: "absolute",
          top: "2%",
          left: "2%",
          width: "10%",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="xs"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "2px solid #007fff",
          borderRadius: 15,
          padding: "20px 30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <CssBaseline />

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              color: "#e60000",
              marginBottom: 10,
            }}
          >
            MEU PERFIL
          </Typography>

          <PersonIcon style={{ fontSize: 60, color: "#e60000", marginBottom: 10 }} />

          <form onSubmit={handleUpdate} style={{ width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              label="Nome"
              name="name"
              value={user.name}
              onChange={onChange}
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="CPF"
              name="cpf"
              value={user.cpf}
              onChange={onChange}
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={user.email}
              onChange={onChange}
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={user.password}
              onChange={onChange}
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
            />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="error"
                type="submit"
                style={{ flex: 1, marginRight: 10 }}
              >
                Atualizar
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#e60000", color: "white", flex: 1 }}
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Excluir
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Perfil;
