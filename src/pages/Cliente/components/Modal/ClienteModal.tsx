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
import MascaraDataNasc from '../../../../components/Mascaras/MascaraDataNasc';
import ICliente from '../../Interfaces/ICliente'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1,0,0,0)
      },
    },
    marginRight:{
      margin: theme.spacing(0,1,0,0)
    },
    marginLeft:{
      margin: theme.spacing(0,0,0,1)
    },
    select:{
      width: 160
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
  const [dataNasc,setDataNasc] = useState("");
  const [erros,setErros] = useState<IErroCliente>();

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
    
    if(ValidarNome()){
      //mensagem Alert
      retorno = false
    }

    if(ValidarCelular()){
      //mensagem Alert
      retorno = false
    }

    if(email !== '')
      if(ValidarEmail())
      {
        //mensagem Alert
        retorno = false
      }


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
    if(props.erro === true){
      setErros({...erros,CpfValido:{mensagem:props.mensagem,erro:props.erro}})
      //mensagem Alert
    }
    
  }

  return (
    <div>
      <Dialog open={props.openDilog} onClick={event => ("")}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastrar Cliente</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <Box width="100%"  className={classes.root}>
              <Box>
                <TextField 
                  label="Nome" 
                  variant="outlined" 
                  size="small"
                  type="text"
                  value={nome}                  
                  onChange={e=>setNome(e.target.value)}
                  inputProps={{ maxLength: 150 }}
                  onBlur={(e) => {
                      const ehValido = ValidarNome()
                     setErros({...erros,NomeValido:{erro:ehValido,mensagem:"Por favor informe um nome."}}) }}
                  error={erros?.NomeValido?.erro ?? false}
                  required
                  fullWidth
                  autoFocus                  
                  />                                   
              </Box>
              <Box>
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
                    const ehValido = ValidarEmail()
                   setErros({...erros,EmailValido:{erro:ehValido,mensagem:"Por favor informe um e-mail valido."}}) }}
                   error={erros?.EmailValido?.erro ?? false}
                  required
                  fullWidth          
                 />                
              </Box>
              
              <Box display='flex'>
                <Box className={classes.marginRight}>
                  <TextFieldMask 
                    valor={numTelefone}
                    label={"Telefone"}
                    type="text"
                    required={false}
                    mask={MascaraTelefone}
                    onBlurValid={() => ""}
                    GetValor={(e:any) => handleNumTelefone(e)}/>
                </Box>
                <Box className={classes.marginRight}>
                  <TextFieldMask 
                    valor={numCelular1}
                    label={"Celular"}
                    type="text"
                    required={true}
                    onBlurValid={() => ""}
                    mask={MascaraCelular}
                    GetValor={(e:any) => handleNumCelular1(e)}/>
                </Box>             
                <Box >
                  <TextFieldMask 
                    valor={numCelular2}
                    label={"Celular"}
                    type="text"
                    required={false}
                    mask={MascaraCelular}
                    onBlurValid={() => ""}
                    GetValor={(e:any) => handleNumCelular2(e)}/>
                </Box>              
              </Box>

              <Box display='flex'>
                <Box className={classes.marginRight} >
                  <TextFieldMask 
                    valor={numCpf}
                    label={"CPF"}
                    type="text"
                    required={false}
                    mask={MascaraCPF}
                    onBlurValid={(e:any) => RetornoValidacaoCpf(e)}
                    GetValor={(e:any) => handleNumCpf(e)}/>
                </Box>
                <Box className={classes.marginRight} >
                  <TextFieldMask 
                    valor={dataNasc}
                    type="text"
                    required={false}
                    label={"Data Nascimento"}
                    onBlurValid={() => ""}
                    mask={MascaraDataNasc}
                    GetValor={(e:any) => handleDataNasc(e)}/>
                </Box>             
                <Box >
                <FormControl variant="outlined" size="small">
                        <InputLabel id="demo-simple-select-outlined-label" >Sexo</InputLabel>
                        <Select value={sexo}                             
                            onChange={(e:any)=>setSexo(e.target.value)}
                            className={classes.select}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="sexo"
                        >
                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>                        
                        </Select>
                    </FormControl>
                </Box>                
              </Box>
              
            </Box>

            <Box display="flex" justifyContent="flex-end" className={classes.spacingTop3}>
              <Box className={classes.marginRight}>
                <Button onClick={Fechar}>Fechar</Button>
              </Box>              
              <Box>
                <Button variant="contained" onClick={() => formularioValido() === true ? submit() : () => false} color="primary" >Salvar</Button>
              </Box>
              
            </Box>
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