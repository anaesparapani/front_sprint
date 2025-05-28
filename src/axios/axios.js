import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.80:3000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

// Aqui o interceptor que coloca o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.postCadastro = (user) => api.post("user/", user);
api.postLogin = (user) => api.post("user/login/", user);
api.getSalas = () => api.get("classroom/");
api.getHorariosDisponiveisPorSalaEData = (fk_number, date) => api.get(`/disponibilidade/${fk_number}/${date}`);
api.postReserva = (reserva) => api.post("/schedule/", reserva);
api.getAllSchedules = (userId) => api.get("/schedule", { params: { userId } });

export default api;
