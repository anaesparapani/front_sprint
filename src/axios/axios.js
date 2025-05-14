import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.80:5000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postCadastro: (user) => api.post("user/", user),
  postLogin: (user) => api.post("user/login/", user),
  getSalas: () => api.get("classroom/"),
  getHorariosDisponiveisPorSalaEData: (fk_number, date) => api.get(`/disponibilidade/${fk_number}/${date}`),
  postReserva: (reserva) => api.post("/schedule/", reserva),
};

export default sheets;
