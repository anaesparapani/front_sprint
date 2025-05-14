import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.layout}>
      <div style={styles.container}>
        {/* Botões no topo */}
        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={() => navigate("/salas")}>
            Salas
          </button>
        </div>
        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={() => navigate("/perfil")}>
            Perfil
          </button>
        </div>

        {/* Título e subtítulo */}
        <h1 style={styles.title}>BEM-VINDO AO SITE!</h1>
        <div style={styles.line1}></div>
        <h2 style={styles.subtitle}>SENAI FRANCA–SP</h2>
        <div style={styles.line2}></div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    backgroundImage: "url('/Imagem_de_fundo.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  button: {
    padding: "10px 20px",
    borderRadius: 20,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    border: "none",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 4,
    textAlign: "left",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "left",
  },
  line1: {
    width: "20%",
    height: 1,
    backgroundColor: "#fff",
  },
  line2: {
    width: "12%",
    height: 1,
    backgroundColor: "#fff",
    marginTop: -10,
  },
};

export default Home;
