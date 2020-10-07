import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { mostrarOcultarModal } from '../../../../store/Cliente/clienteReducer';
import TextFieldMask from '../../../../components/TextFieldMask/TextFieldMask';
import Box from '@material-ui/core/Box';
import MascaraCelular from '../../../../components/Mascaras/MascaraCelular';
import MascaraTelefone from '../../../../components/Mascaras/MascaraTelefone';
import MascaraCPF from '../../../../components/Mascaras/MascaraCPF';
import ICliente from '../../Interfaces/ICliente'
import Mensagens from '../../../../components/Mensagens';
import IMensagens from '../../../../components/Mensagens/Interface/IMensagens';
import { Grid } from '@material-ui/core';

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

  interface IErro{
    mensagem: string;
    erro: boolean
  }

interface IErroCliente{
  NomeValido?: IErro,
  Celular1Valido?: IErro,
  EmailValido?: IErro,
  CpfValido?: IErro
}

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [numCelular1,setNumCelular1] = useState("");
  const [numCelular2,setNumCelular2] = useState("");
  const [numTelefone,setNumTelefone] = useState("");
  const [numCpf,setNumCpf] = useState("");
  const [sexo,setSexo] = useState("");
  const [dataNasc,setDataNasc] = useState<Date>();
  const [erros,setErros] = useState<IErroCliente>();

  //State Mensagem
  const [openMensagem, setOpenMensagem] = useState<boolean>(false);
  const [tipoMensagem, setTipoMensagem] = useState<'success' | 'info' | 'warning' | 'error'>("info");
  const [mensagem, setMensagem] = useState<string>("");

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
    setErros({Celular1Valido:{mensagem:"",erro:false},
              EmailValido:{mensagem:"",erro:false},
              NomeValido:{mensagem:"",erro:false},
              CpfValido:{mensagem:"",erro:false}})   
  }

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
  const handleDataNasc = (props:any) => {
    setDataNasc(props);
  }

  const formularioValido =()=>{
    let retorno: Boolean = true;

    var listErro:IErroCliente = {};

    if(ValidarNome()){
      if((erros?.NomeValido?.erro ?? false) === false)
        listErro = {...listErro, NomeValido:{erro:true,mensagem:"Campo Obriatório!"}}
      retorno = false
    }

    if(ValidarCelular()){
      if((erros?.Celular1Valido?.erro ?? false) === false)
        listErro = {...listErro,Celular1Valido:{erro:true,mensagem:"Campo Obriatório!"}}
      retorno = false
    }

    if(email !== ''){
      if(ValidarEmail())
      {
        listErro = {...listErro,Celular1Valido:{erro:true,mensagem:"."}}
        retorno = false
      }
    }

    if(erros?.CpfValido?.erro){
      ////mensagem Alert
      retorno = false
    }

    setErros({...erros,...listErro})
    setOpenMensagem(true);
    setTipoMensagem("error");
    setMensagem("Por Favor, preencha os campos obrigatórios.");

    return retorno;
  }

  const ValidarNome = (): boolean =>{
    let retorno: boolean = false;

    if(nome.length < 3){
      retorno = true;
    }
    return retorno;
  }
  
  const ValidarCelular = (): boolean =>{
    let retorno: boolean = false;

    if(numCelular1.length < 11){      
      retorno = true;
    }

    return retorno;
  }

  const ValidarEmail = (): boolean => {
    let retorno: boolean = false;
    
    if(email !== '') {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if(!regexp.test(email)){
        retorno = true
      }
    }
    return retorno
  }

  const RetornoValidacaoCpf = (props:IErro) => {
    setErros({...erros,CpfValido:{...props}});      
  }

  const RetornoValidacaoCelular = (props:IErro) => {
    setErros({...erros,Celular1Valido:{...props}});
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
                    if(ValidarEmail()) 
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
                  id={"Celular1"}
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

              <Grid item alignItems="flex-start" >
              <Button onClick={Fechar}>Fechar</Button>
              <Button 
                variant="contained" 
                onClick={() => formularioValido() === true ? submit() : () => false} 
                color="primary" >Salvar
              </Button>
              </Grid>             
            </Grid>
            
            <DialogActions>
            
              
                         
            </DialogActions>           
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