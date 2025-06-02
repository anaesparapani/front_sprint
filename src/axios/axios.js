import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.80:3000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Substituído SecureStore por localStorage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resposta de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.warn(
        "Erro 403 - Acesso negado. Token pode estar inválido ou expirado."
      );
    }
    return Promise.reject(error);
  }
);

// Endpoints
api.postCadastro = (user) => api.post("user/", user);
api.postLogin = (user) => api.post("user/login/", user);
api.getSalas = () => api.get("classroom/");
api.getHorariosDisponiveisPorSalaEData = (fk_number, date) =>
  api.get(`/disponibilidade/${fk_number}/${date}`);
api.postReserva = (reserva) => api.post("/schedule/", reserva);
api.getSchedulesByUser = (userId) => api.get(`/schedule/user/${userId}`);
api.deleteSchedule = (id) => api.delete(`/schedule/${id}`);
api.updateSchedule = (id) => api.put(`/schedule/${id}`);



export default api;
