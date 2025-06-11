import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "@mui/material";
import api from "../axios/axios";

function Home() {
  const navigate = useNavigate();
  const [totalReservas, setTotalReservas] = useState(0);

  const carregarTotalReservas = async () => {
    try {
      const userId = localStorage.getItem("userId"); // no web usamos localStorage
      if (!userId) return;

      const response = await api.totalReservas(userId);
      setTotalReservas(response.data.total_reservas);
    } catch (error) {
      console.error("Erro ao buscar total de reservas:", error);
    }
  };

  useEffect(() => {
    carregarTotalReservas();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <strong>
            <em>SENAI</em>
          </strong>
        </div>
        <div style={styles.botoes}>
          <div style={styles.bot} onClick={() => navigate("/salas")}>
            Salas
          </div>
          <div style={styles.bot} onClick={() => navigate("/reserva")}>
            Reservar
          </div>
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            Total de Reservas: {totalReservas}
          </div>
        </div>
        <IconButton
          style={styles.iconPessoa}
          onClick={() => navigate("/perfil")}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </header>

      <div style={styles.linhaDecorativa}></div>

      <main style={styles.main}>
        <img
          src="/imagemSENAI.webp"
          alt="Imagem do SENAI"
          style={styles.image}
        />
        <div style={styles.welcomeBox}>
          <h1 style={styles.title}>BEM–VINDO AO SITE!</h1>
          <div style={styles.line1}></div>
          <h2 style={styles.subtitle}>SENAI FRANCA–SP</h2>
          <div style={styles.line2}></div>
        </div>
      </main>

      <IconButton style={styles.logoutIcon} onClick={handleLogout}>
        <LogoutIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/Imagem_de_fundo.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    position: "relative",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
  },
  linhaDecorativa: {
    width: "1250px",
    height: "2px",
    backgroundColor: "white",
    margin: "0 auto",
    marginTop: "-10px",
  },
  logo: {
    fontSize: 40,
    color: "white",
    fontWeight: 900,
    fontFamily: "'Arial Black', sans-serif",
  },
  botoes: {
    display: "flex",
    cursor: "pointer",
    gap: 40,
  },
  bot: {
    fontSize: 18,
    fontWeight: "bold",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    gap: "40px",
  },
  iconPessoa: {
    fontSize: 30,
    backgroundColor: "rgba(242, 65, 65, 0.64)",
    color: "white",
  },
  image: {
    width: 550,
    height: 250,
  },
  welcomeBox: {
    maxWidth: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 8,
  },
  line1: {
    width: "100%",
    height: 1,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
  },
  line2: {
    width: "80%",
    height: 1,
    backgroundColor: "#fff",
  },
  logoutIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    color: "white",
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    borderRadius: "50%",
    padding: 8,
  },
};

export default Home;
