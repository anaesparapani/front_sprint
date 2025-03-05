import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getSalas:()=>api.get("/classroom/"),
}

export default sheets;