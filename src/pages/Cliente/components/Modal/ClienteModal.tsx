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
  }
  }),
);

const ClienteModal = (props:any) => {
  const classes = useStyles();

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [numCelular1,setNumCelular1] = useState("");
  const [numCelular2,setNumCelular2] = useState("");
  const [numTelefone,setNumTelefone] = useState("");
  const [numCpf,setNumCpf] = useState("");
  const [sexo,setSexo] = useState("");
  const [dataNasc,setDataNasc] = useState("");
  const [erros, setErros] = React.useState<string[]>([]);


  const submit = (event:any) => {
    event.preventDefault();
    props.mostrarOcultarModal(false)

    

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

    ValidarCampos(cliente);
    setErros(erros.concat("Por favor preencha nome válido"))
    console.log(erros);

    console.log(cliente)

    LimparCampos();
  }

  const ValidarCampos = (props:ICliente) =>{

    if(nome.length < 3){
      setErros([...erros, "Por favor preencha nome válido"])
    }
    setErros([...erros, "Por favor preencha nome válido"])
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(email)){
      setErros([...erros, "Por favor preencha email válido"])
    }
    

    
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

  return (
    <div>
      <Dialog open={props.openDilog} onClick={event => ("")}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastrar Cliente</DialogTitle>
        <DialogContent>
          <form autoComplete="off" >
            <Box width="100%"  className={classes.root}>
              <Box>
                <TextField 
                  id="IdNome"              
                  label="Nome" 
                  variant="outlined" 
                  size="small"
                  type="text"
                  value={nome}
                  inputProps={{ maxLength: 150 }}
                  onChange={e=>setNome(e.target.value)}
                  required
                  fullWidth
                  autoFocus/>
              </Box>
              <Box>
                <TextField
                  id="IdEmail"
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 150 }}
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
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
                    required={true}
                    mask={MascaraTelefone}
                    GetValor={(e:any) => handleNumTelefone(e)}/>
                </Box>
                <Box className={classes.marginRight}>
                  <TextFieldMask 
                    valor={numCelular1}
                    label={"Celular"}
                    type="text"
                    required={true}
                    mask={MascaraCelular}
                    GetValor={(e:any) => handleNumCelular1(e)}/>
                </Box>             
                <Box >
                  <TextFieldMask 
                    valor={numCelular2}
                    label={"Celular"}
                    type="text"
                    required={true}
                    mask={MascaraCelular}
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
                    GetValor={(e:any) => handleNumCpf(e)}/>
                </Box>
                <Box className={classes.marginRight} >
                  <TextFieldMask 
                    valor={dataNasc}
                    type="text"
                    required={false}
                    label={"Data Nascimento"}
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
            

          </form>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={Fechar}>
            Fechar
          </Button>
          <Button onClick={submit} variant="contained" color="primary" href="#contained-buttons">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    openDilog: state.cliente.openModal
})

const mapDispatchToProps = (dispatch:any) => bindActionCreators({ mostrarOcultarModal }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(ClienteModal)