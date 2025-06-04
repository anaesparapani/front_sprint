import React from "react";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FB4843",
        width: "100%", //largura
        height: "30px", //altura
        position: "fixed",
        bottom: 0,
      }}
    />
  );
};
export default Footer;