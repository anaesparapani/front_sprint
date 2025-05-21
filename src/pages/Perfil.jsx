import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CssBaseline } from "@mui/material";
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
      const response = await api.updateUser(user);
      console.log(response);
    } catch (error) {
      alert("Erro ao atualizar usuário.");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteUser(user.id);
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
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Logo SENAI */}
      <Typography
  variant="h4"
  style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    fontWeight: "bold",
    color: "white",
    fontSize: "36px",
    letterSpacing: "3px",
    fontFamily: "Arial, sans-serif",
    textTransform: "uppercase",
  }}
>
  SENAI
</Typography>


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
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon style={{ fontSize: 50, color: "#f28b8b" }} />
          </Box>
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

          <form onSubmit={handleUpdate}>
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
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
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
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default Perfil;
