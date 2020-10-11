import { string } from "yup"

export default interface IEndereco {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}