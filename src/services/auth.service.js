import axiosClient from "./axiosClient";




const login = async (codigo, password, rol) => {

 const { data } = await axiosClient.post("/auth/login", { codigo, password, rol });

 return data;

};




const registrar = async ({ codigo, nombre, password, rol }) => {

 const { data } = await axiosClient.post("/auth/registrar", { codigo, nombre, password, rol });

 return data;

};




const listarUsuarios = async () => {

 const { data } = await axiosClient.get("/auth/usuarios");

 return data;

};




const toggleAcceso = async (id) => {

 const { data } = await axiosClient.put(`/auth/usuarios/${id}/acceso`);

 return data;

};



const authService = { login, registrar, listarUsuarios, toggleAcceso };



export default authService;
