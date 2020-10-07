import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({   
  textField:{
      width: 180
  },  
}));


interface States{
  id: string;
  valor: string;
  mask: any;
  label: string;
  type: string;
  required: boolean;
  error?: boolean;
  onBlurValid: Function;
  GetValor: Function;
  helperText?: string;
}

const TextFieldMask: React.FC<States> = (props) => {
  const classes = useStyles();

interface IErro{
  mensagem: string;
  erro: boolean
}

  const [values, setValues] = useState(props.valor);
  const [erros,setErros] = useState<IErro>({mensagem:"",erro:props.error ?? false});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
    props.GetValor(RemoverCaractereEspecial(event.target.value));
  }; 

  const validarCelular = () =>{
    let objErro = {mensagem:"",erro:false};

    if((RemoverCaractereEspecial(values).length < 11) && (RemoverCaractereEspecial(values).length > 0))
    {        
      objErro = {mensagem:"Número incorreto.",erro:true};      
    }

    setErros({...objErro});
    props.onBlurValid(objErro);
  }
  
  const validarCpf =()=>{
    let objErro = {mensagem:"",erro:false};

    if(RemoverCaractereEspecial(values).length <= 0)
    {        
      setErros({...objErro})
      props.onBlurValid(objErro)
      return
    }

    if(CpfValido()){
      setErros({mensagem:"",erro:false})
    }else{
      objErro = {mensagem:"CPF incorreto.",erro:true};
      setErros({...objErro})
      props.onBlurValid(objErro)
    }      
  }
  const CpfValido =()=> {
    var Soma = 0;

    // Esta função retira os caracteres . e - da string do cpf, deixando apenas os números 
    var strCPF = values.replace('(','').replace(')','').replace(' ','').replace(' ','').replace('-','').replace('.','').replace('.','')
    // Testa as sequencias que possuem todos os dígitos iguais e, se o cpf não tem 11 dígitos, retorna falso e exibe uma msg de erro
    if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' || 
    strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' || 
    strCPF === '99999999999' || strCPF.length !== 11) {
      return false;
    }

    // Os seis blocos seguintes de funções vão realizar a validação do CPF propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
    // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número para ser testado

    //Multiplica cada digito por numeros de 1 a 9, soma-os e multiplica-os por 10. Depois, divide o resultado encontrado por 11 para encontrar o resto
    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    var Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(9, 10))) {
      return false;
    }

    Soma = 0;
    for (let k = 1; k <= 10; k++) {
      Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
    }

    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(10, 11))) {
      return false;
    }

    return true;
  }

  const RemoverCaractereEspecial = (props:any) => {
    var valor:string = "";

    valor = props.replaceAll('(','')
    .replaceAll(')','')
    .replaceAll(' ','')                      
    .replaceAll('-','')
    .replaceAll('.','')
    .replaceAll('/','')
    .replaceAll('_','');

    return valor;
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
                  onBlur={(e:any) =>  {
                    if(props.id === 'CPF'){
                      validarCpf()
                    }
                    if(props.id === 'Celular1')
                      validarCelular()
                  }}
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