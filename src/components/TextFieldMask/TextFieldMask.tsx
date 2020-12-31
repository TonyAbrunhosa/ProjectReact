import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import ITextFieldMask from './Interface/ITextFieldMask';
import { CpfValid, RemoverCaractereEspecial } from './TextFieldMaskValid';

const useStyles = makeStyles((theme) => ({   
  textField:{
      width: 180
  },  
}));

const TextFieldMask: React.FC<ITextFieldMask> = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState(props.valor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
    props.GetValor(RemoverCaractereEspecial(event.target.value));
  }; 

const validarCampo = ()=>{
  switch (props.id) {
    case 'CPF':
        validarCpf();
      break;
    case 'Celular':
        validarCelular();  
      break;
    case 'Cep':
      validarCep();  
    break;
  }
}

  const validarCelular = () =>{
    let objErro = {mensagem:"",erro:false};

    if((RemoverCaractereEspecial(values).length < 11) && (RemoverCaractereEspecial(values).length > 0))
    {        
      objErro = {mensagem:"Número incorreto!",erro:true};      
    }
    props.onBlurValid(objErro);
  }
  
const validarCep = () => {
  let objErro = {mensagem:"",erro:false};

    if((RemoverCaractereEspecial(values).length < 8) && (RemoverCaractereEspecial(values).length > 0))
    {        
      objErro = {mensagem:"Cep incorreto!",erro:true};      
    }
    props.onBlurValid(objErro);
}

  const validarCpf =()=>{
    let objErro = {mensagem:"",erro:false};

    if(RemoverCaractereEspecial(values).length <= 0)
    {        
      props.onBlurValid(objErro)
      return
    }

    if(CpfValid(values)){
      props.onBlurValid(objErro)
    }else{
      objErro = {mensagem:"CPF incorreto!",erro:true};
      props.onBlurValid(objErro)
    }      
  } 

  return (
    <div>
      <FormControl>
        <TextField 
                  label={props.label}
                  variant="outlined" 
                  size="small"
                  type={props.type}
                  value={values}
                  onChange={handleChange}
                  name="textmask"
                  id="inputCelular"
                  error={props?.error ?? false}
                  onBlur={(e:any) => { validarCampo() }}
                  required={props.required}
                  InputProps={{
                      inputComponent: props.mask as any
                    }}
                  className={classes.textField}
                  helperText={props?.helperText ?? ""}/>
      </FormControl>
    </div>
     
  );
}
export default TextFieldMask;