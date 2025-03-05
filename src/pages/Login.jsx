import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Login() {
  //   const [user, setUser] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const onChange = (event) => {
  //     const { name, value } = event.target;
  //     setUser({ ...user, [name]: value });
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     login();
  //   };

  //   async function login() {
  //     await api.postLogin(user).then(
  //       (response) =>{
  //         alert(response.data.message)
  //       },
  //       (error) =>{
  //         console.log(error)
  //         alert(error.response.data.error)
  //       }
  //     )
  //   }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>

        <Box
          component="form"
          onSubmit={() => {
            console.log("Ainda não faz nada");
          }}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
            name="cpf"
            id="cpf"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            <Link to="/salas">Login</Link>
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            <Link to="/cadastro">Cadastro</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
