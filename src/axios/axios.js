import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.80:3000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.reject(error)
);

// Endpoints
api.postCadastro = (user) => api.post("user/", user);
api.postLogin = (user) => api.post("user/login/", user);
api.getSalas = () => api.get("classroom/");
api.getHorariosDisponiveisPorSalaEData = (fk_number, date) =>
  api.get(`/disponibilidade/${fk_number}/${date}`);
api.postReserva = (reserva) => api.post("/schedules/", reserva);
api.getSchedulesByUser = (userId) => api.get(`/schedule/user/${userId}`);
api.deleteSchedule = (id) => api.delete(`/schedules/${id}`);
api.getUserById = (userId) => api.get(`/user/${userId}`);
api.deleteUser = (userId) => api.delete(`/users/${userId}`);
api.updateUser = (id,user) => api.put(`/users/${id}`, user);
 

export default api;
