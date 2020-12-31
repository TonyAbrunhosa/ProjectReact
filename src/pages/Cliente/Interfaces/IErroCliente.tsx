export default interface IErroCliente{
    NomeValido?: IErro,
    Celular1Valido?: IErro,
    EmailValido?: IErro,
    CpfValido?: IErro
    CepValido?: IErro
  }

 export interface IErro{
    mensagem: string;
    erro: boolean
  }