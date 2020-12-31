import axios from 'axios';
import ICliente from '../Interfaces/ICliente';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL
})

export function salvar( cliente:ICliente ){
    http.post('/Novo',cliente, {
        headers: { 'x-tenant-id' : localStorage.getItem('email_usuario_logado') },
    }).then(response => {
        
    })
}