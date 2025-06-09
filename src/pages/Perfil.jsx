import api from "../axios/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CssBaseline } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";

function Perfil() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    id: "",
    name: "",
    cpf: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!userId) return;

        const response = await api.get(`/user/${userId}`);
        const userData = response.data.user;

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

    fetchUsuario();
  }, [userId]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await api.updateUser(user.id, {
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error.response.data);
      alert(
        "Erro ao atualizar os dados do usuário.",
        error.response.data.error
      );
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir sua conta?"
    );
    if (!confirmDelete) return;

    try {
      const response = await api.deleteUser(user.id);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
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

      <Box
        style={{
          display: "flex",
          backgroundColor: "#ffeaea",
          borderRadius: "12px",
          width: "800px",
          padding: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
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

        <Box style={{ width: "70%" }}>
          <CssBaseline />
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

          <TextField
            fullWidth
            placeholder="Nome:"
            name="name"
            value={user.name}
            onChange={onChange}
            style={{
              marginBottom: 12,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          />
          <TextField
            fullWidth
            placeholder="CPF:"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
            style={{
              marginBottom: 12,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          />
          <TextField
            fullWidth
            placeholder="E-mail:"
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
            style={{
              marginBottom: 12,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          />
          <TextField
            fullWidth
            placeholder="Senha:"
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
            style={{
              marginBottom: 20,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          />

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
