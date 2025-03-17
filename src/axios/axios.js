import axios from "axios"

const api = axios.create({
    baseURL:"http://10.89.240.80:5000/api/reservas/v1",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:()=>api.post("/cadastro"),
    postLogin:()=>api.post("/login"),
    getSalas:()=>api.get("/classroom/")
}

export default sheets;