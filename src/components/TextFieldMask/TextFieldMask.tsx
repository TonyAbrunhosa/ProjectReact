import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({   
  textField:{
      width: 160
  },  
}));


interface States{
  valor: string;
  mask: any;
  label: string;
  type: string;
  required: boolean;
  GetValor: Function
}

const TextFieldMask: React.FC<States> = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState(props.valor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
    props.GetValor(event.target.value.replace('(','').replace(')','').replace(' ','').replace(' ','').replace('-','').replace('.','').replace('.','').replace('/','').replace('/',''));
  };

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
                  required={props.required}
                  InputProps={{
                      inputComponent: props.mask as any
                    }}
                  className={classes.textField}/>
      </FormControl>
    </div>
     
  );
}
export default TextFieldMask;