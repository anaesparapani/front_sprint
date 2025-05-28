import React from "react";
import { useNavigate } from "react-router-dom"; // import necessário
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const navigate = useNavigate(); // hook para navegação

  return (
    <AppBar sx={{ backgroundColor: "#ff6347", width: "100%", margin: 0,boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="red"
          onClick={() => navigate("/perfil")} // redireciona para /perfil
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
