import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.79:3000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

api.postCadastro = (user) => api.post("user/", user);
api.postLogin = (user) => api.post("user/login/", user);
api.getSalas = () => api.get("classroom/");
api.getHorariosDisponiveisPorSalaEData = (fk_number, date) => api.get(`/disponibilidade/${fk_number}/${date}`);
api.postReserva = (reserva) => api.post("/schedule/", reserva);
api.updateUser = (user) => api.put("user/", user);
api.deleteUser = (id) => api.delete(`user/${id}`);

export default api;