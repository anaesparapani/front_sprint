import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const DefaultLayout = ({ children }) => { 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100px" }}>
      <Header />
      {/* AQUI VEM O CONTEÚDO DA PÁGINA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center", // Centraliza o conteúdo horizontalmente
          alignItems: "center", // Centraliza o conteúdo verticalmente
          padding: "30px",
        }}
      >
        {children} {/*conteúdo da página protegida*/}
      </Box>

      <Footer />
    </Box>
  );
};
export default DefaultLayout;