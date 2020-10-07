import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IMensagens from './Interface/IMensagens'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Mensagens: React.FC<IMensagens> = (props) => {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Snackbar 
        onClose={() => props.onClose()}
        autoHideDuration={props.tempo ?? 6000}
        anchorOrigin={props.posicao ?? {vertical:"top", horizontal:"center"}}
        open={props.open ?? false}>
        <Alert onClose={() => props.onClose()} variant="filled" severity={props.tipo ?? "info"}>
          {props.mensagem}
        </Alert>
      </Snackbar>      
    </div>
  );
}
export default Mensagens;