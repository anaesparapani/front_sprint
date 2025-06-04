import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/icons-material/PersonOutline";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <strong>
            <em>SENAI</em>
          </strong>
        </div>
        <navigate style={styles.botoes}>
          <div style={styles.bot} onClick={() => navigate("/salas")}>
            Salas
          </div>
          <div style={styles.bot} onClick={() => navigate("/reserva")}>
            Reservas
          </div>
        </navigate>
        <IconButton
          style={styles.iconPessoa}
          color="red"
          onClick={() => navigate("/perfil")}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </header>
      <div style={styles.linhaDecorativa}></div>


      <main style={styles.main}>
        <img src="/escola.jpg" alt="Imagem do SENAI" style={styles.image} />
        <div style={styles.welcomeBox}>
          <h1 style={styles.title}>BEM–VINDO AO SITE!</h1>
          <div style={styles.line1}></div>
          <h2 style={styles.subtitle}>SENAI FRANCA–SP</h2>
          <div style={styles.line2}></div>
        </div>
      </main>
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
    gap: 40
  },
  bot: {
    fontSize: 18,
    fontWeight: "bold"
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
  },
  image: {
    width: 550,
    height: 250
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
};

export default Home;
