import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { mostrarOcultarModal } from '../../../../store/Cliente/clienteReducer';
import TextFieldMask from '../../../../components/TextFieldMask';
import MascaraCelular from '../../../../components/Mascaras/MascaraCelular';
import MascaraTelefone from '../../../../components/Mascaras/MascaraTelefone';
import MascaraCPF from '../../../../components/Mascaras/MascaraCPF';
import ICliente from '../../Interfaces/ICliente'
import Mensagens from '../../../../components/Mensagens';
import IMensagens from '../../../../components/Mensagens/Interface/IMensagens';
import { Grid } from '@material-ui/core';
import { ValidEmail } from './ClienteModalValid';
import IErroCliente, { IErro } from '../../Interfaces/IErroCliente';
import { ObterEndereco } from '../../../../Service/ViaCep/EnderecoService';
import IEndereco from '../../../../Service/ViaCep/Interface/IEndereco';
import MascaraCep from '../../../../components/Mascaras/MascaraCep';
import { RemoverCaractereEspecial } from '../../../../components/TextFieldMask/TextFieldMaskValid';
import Axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
    },
    campo:{
      width: 180
    },
    spacingTop3:{
      margin: theme.spacing(3,0,0,0)
    } 
  }),
);

const ClienteModal = (props:any) => {
  const classes = useStyles();
  //State Cliente
  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [numCelular1,setNumCelular1] = useState("");
  const [numCelular2,setNumCelular2] = useState("");
  const [numTelefone,setNumTelefone] = useState("");
  const [numCpf,setNumCpf] = useState("");
  const [sexo,setSexo] = useState("");
  const [dataNasc,setDataNasc] = useState<string>("");
  const [cep,setCep] = useState<string>("");
  const [logradouro,setLogradouro] = useState<string>("");
  const [numeroEnd,setNumeroEnd] = useState<string>("");
  const [complemento,setComplemento] = useState<string>("");
  const [localidade,setLocalidade] = useState<string>("");
  const [bairro,setBairro] = useState<string>("");
  const [uf,setUf] = useState<string>("");
  const [erros,setErros] = useState<IErroCliente>();  
  //State Mensagem
  const [openMensagem, setOpenMensagem] = useState<boolean>(false);
  const [tipoMensagem, setTipoMensagem] = useState<'success' | 'info' | 'warning' | 'error'>("info");
  const [mensagem, setMensagem] = useState<string>("");  

  const handleNumCelular1 = (props:any) => {
    setNumCelular1(props);
  }
  const handleNumCelular2 = (props:any) => {
    setNumCelular2(props);
  }
  const handleNumTelefone = (props:any) => {
    setNumTelefone(props);
  }
  const handleNumCpf = (props:any) => {
    setNumCpf(props);
  }
  const handlerCep = (props:any) => {
    setCep(props);
  }
  const handleDataNasc = (props:string) => {    
    //let date_ob = new Date(props);
    //let date = ("0" + date_ob.getUTCDate()).slice(-2);
    //let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    //let year = date_ob.getFullYear();
    //let data = date + "/" + month + "/" + year;
    //debugger
    //if(data.length === 10)
      setDataNasc(props);
  }

  const formularioValido =()=>{
    let retorno: Boolean = true;

    var listErro:IErroCliente = {};

    if(nome.length < 3){
      if((erros?.NomeValido?.erro ?? false) === false)
        listErro = {...listErro, NomeValido:{erro:true,mensagem:"Campo Obriatório!"}}
      retorno = false
    }

    if(numCelular1.length < 11){
      if((erros?.Celular1Valido?.erro ?? false) === false)
        listErro = {...listErro,Celular1Valido:{erro:true,mensagem:"Campo Obriatório!"}}
      retorno = false
    }

    if(email !== ''){
      retorno = ValidEmail(email);
    }

    if(erros?.CpfValido?.erro){
      retorno = false
    }

    if(erros?.CepValido?.erro){
      retorno = false
    }

    setErros({...erros,...listErro})

    if(!retorno){
      setOpenMensagem(true);
      setTipoMensagem("error");
      setMensagem("Por Favor, preencha corretament os campos sinalizados.");
    }   

    return retorno;
  }
  
  const RetornoValidacaoCpf = (props:IErro) => {
    setErros({...erros,CpfValido:{...props}});      
  }

  const RetornoValidacaoCelular = (props:IErro) => {
    setErros({...erros,Celular1Valido:{...props}});
  }

  const RetornoValidacaoCep = (props:IErro) => {
    if((erros?.CepValido?.erro ?? false)=== false)
      PreencherCamposEndereco();   
    setErros({...erros,CepValido:{...props}});
  }

  async function PreencherCamposEndereco(){
    let endereco:IEndereco = {...await ObterEndereco(RemoverCaractereEspecial(cep))};
    LimparCamposEndereco();
    setLogradouro(endereco.logradouro ?? "");
    setBairro(endereco?.bairro ?? "");
    setUf(endereco?.uf ?? "");
    setLocalidade(endereco?.localidade ?? "");
  }

  const submit = () => {
    //e.preventDefault();

    debugger
    var cliente: ICliente = {
        Nome: nome,
        Email: email,
        Telefone: numTelefone,
        Celular1: numCelular1,
        Celular2: numCelular2,
        Cpf: numCpf,
        Sexo: sexo,
        DataNasc: dataNasc
    }

    LimparCampos();
    props.mostrarOcultarModal(false) 
  }

  const Fechar = () => {
    LimparCampos();
    props.mostrarOcultarModal(false);
  }

  const LimparCampos = () => {
    setNome("");
    setEmail("");
    setNumCelular1("");
    setNumCelular2("");
    setNumCpf("");
    setSexo("");
    setCep("");
    LimparCamposEndereco();
    setErros({Celular1Valido:{mensagem:"",erro:false},
              EmailValido:{mensagem:"",erro:false},
              NomeValido:{mensagem:"",erro:false},
              CpfValido:{mensagem:"",erro:false},
              CepValido:{mensagem:"",erro:false}
            })   
  }

  const LimparCamposEndereco =()=>{
    setLogradouro("");
    setLocalidade("");
    setBairro("");
    setNumeroEnd("");
    setComplemento("");
    setUf("");
  }

  return (
    <div>
      <Mensagens 
       open={openMensagem}
       onClose={() => setOpenMensagem(false)}
       mensagem={mensagem}
       tipo={tipoMensagem}       
      />

      <Dialog open={props.openDilog} onClick={event => ("")}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastrar Cliente</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <Grid container spacing={1}>
              <Grid item md={12}>                
                  <TextField 
                    label="Nome" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={nome}                  
                    onChange={e=>setNome(e.target.value)}
                    inputProps={{ maxLength: 150 }}      
                    onBlur={(e) => {
                        if (e.target.value.length < 3 && e.target.value.length > 0)
                          setErros({...erros,NomeValido:{erro:true,mensagem:"Informe um Nome!"}})
                        else
                          setErros({...erros,NomeValido:{erro:false,mensagem:""}})
                      }            
                    }                      
                    error={erros?.NomeValido?.erro ?? false}
                    helperText={erros?.NomeValido?.mensagem ?? ""}
                    required
                    fullWidth
                    autoFocus                  
                    />                                   
              </Grid>
              <Grid item md={12}> 
                <TextField
                  id="Email"
                  name="Email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 150 }}
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  onBlur={(e) => {
                    if(ValidEmail(email)) 
                      setErros({...erros,EmailValido:{erro:true,mensagem:"Por favor informe um e-mail válido."}}) 
                    else
                      setErros({...erros,EmailValido:{erro:false,mensagem:""}}) 
                  }}
                  error={erros?.EmailValido?.erro ?? false}
                  helperText={erros?.EmailValido?.mensagem ?? ""}
                  fullWidth          
                 />                
              </Grid>                      

              <Grid item md={4}>
                <TextFieldMask 
                  id={"Telefone"}
                  valor={numTelefone}
                  label={"Telefone"}
                  type="text"
                  required={false}
                  mask={MascaraTelefone}
                  onBlurValid={() => ""}
                  error={false}
                  GetValor={(e:any) => handleNumTelefone(e)}/>
              </Grid>
              <Grid item md={4}>
                <TextFieldMask 
                  id={"Celular"}
                  valor={numCelular1}
                  label={"Celular"}
                  type="text"
                  required={true}
                  onBlurValid={(e:any) => RetornoValidacaoCelular(e)}
                  mask={MascaraCelular}
                  GetValor={(e:any) => handleNumCelular1(e)}
                  helperText={erros?.Celular1Valido?.mensagem ?? ""}
                  error={erros?.Celular1Valido?.erro}/>
              </Grid>             
              <Grid item md={4} >
                <TextFieldMask 
                  id={"Celular2"} 
                  valor={numCelular2}
                  label={"Celular"}
                  type="text"
                  required={false}
                  mask={MascaraCelular}
                  onBlurValid={() => ""}
                  error={false}
                  GetValor={(e:any) => handleNumCelular2(e)}/>
              </Grid>
                        
              <Grid item md={4} >                
                <TextFieldMask 
                  id={"CPF"}
                  valor={numCpf}
                  label={"CPF"}
                  type="text"
                  required={false}
                  mask={MascaraCPF}
                  onBlurValid={(e:any) => RetornoValidacaoCpf(e)}
                  GetValor={(e:any) => handleNumCpf(e)}
                  helperText={erros?.CpfValido?.mensagem ?? ""}
                  error={erros?.CpfValido?.erro}/>
              </Grid>
              <Grid item md={4} >
              <TextField
                  value={dataNasc}
                  type="date"
                  variant="outlined"
                  size="small"
                  label={"Data Nascimento"}
                  className={classes.campo}
                  onChange={e=> handleDataNasc(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}/>
              </Grid>             
              <Grid item md={4}>
              <FormControl variant="outlined" size="small">
                      <InputLabel id="demo-simple-select-outlined-label" >Sexo</InputLabel>
                      <Select value={sexo}                             
                          onChange={(e:any)=>setSexo(e.target.value)}
                          className={classes.campo}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="sexo"
                      >
                      <MenuItem value={"Feminino"}>Feminino</MenuItem>
                      <MenuItem value={"Masculino"}>Masculino</MenuItem>                        
                      </Select>
                  </FormControl>
              </Grid> 

              <Grid item md={4} >                
                <TextFieldMask 
                  id={"Cep"}
                  valor={cep}
                  label={"Cep"}
                  type="text"
                  required={false}
                  mask={MascaraCep}
                  onBlurValid={(e:any) => RetornoValidacaoCep(e)}
                  GetValor={(e:any) => handlerCep(e)}
                  helperText={erros?.CepValido?.mensagem ?? ""}
                  error={erros?.CepValido?.erro}/>
              </Grid>
              <Grid item md={8}>                
                  <TextField 
                    label="Logradouro" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={logradouro}                  
                    disabled={true}     
                    fullWidth           
                    />                                   
              </Grid>
              <Grid item md={4}>                
                  <TextField 
                    label="Número" 
                    variant="outlined" 
                    size="small"
                    type="number"
                    value={numeroEnd}
                    inputProps={{maxLength: 8}}
                    onChange={e=>setNumeroEnd(e.target.value)}
                    fullWidth           
                    />                                   
              </Grid>
              <Grid item md={6}>                
                  <TextField 
                    label="Complemento" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={complemento}
                    onChange={e=>setComplemento(e.target.value)}
                    inputProps={{ maxLength: 30 }}
                    fullWidth           
                    />                                   
              </Grid>
              <Grid item md={2}>                
                  <TextField 
                    label="UF" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={uf}                  
                    disabled={true}     
                    fullWidth           
                    />                                   
              </Grid>
              <Grid item md={6}>                
                  <TextField 
                    label="Bairro" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={bairro}                  
                    disabled={true}     
                    fullWidth           
                    />                                   
              </Grid>
              <Grid item md={6}>                
                  <TextField 
                    label="Localidade" 
                    variant="outlined" 
                    size="small"
                    type="text"
                    value={localidade}                  
                    disabled={true}     
                    fullWidth           
                    />                                   
              </Grid>
            </Grid>     

            <Grid container justify="flex-end" spacing={1} className={classes.spacingTop3}>
              <Grid item md={2}>
                <Button onClick={Fechar}>Fechar</Button>
              </Grid>
              <Grid item md={2}>
                <Button 
                  variant="contained" 
                  onClick={() => formularioValido() === true ? submit() : () => false} 
                  color="primary" >Salvar
                </Button>
              </Grid>
            </Grid>  
          </form>         
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    openDilog: state.cliente.openModal
})

const mapDispatchToProps = (dispatch:any) => bindActionCreators({ mostrarOcultarModal }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(ClienteModal)