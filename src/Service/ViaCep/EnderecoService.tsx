import axios from 'axios';
import IEndereco from './Interface/IEndereco';

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export async function ObterEndereco(Cep:string){ 

    const data:IEndereco = {...await (await api.get<IEndereco>(Cep + '/json')).data};
    
    return data;
}