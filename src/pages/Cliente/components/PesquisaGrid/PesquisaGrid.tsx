import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconAdd from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mostrarOcultarModal } from '../../../../store/Cliente/clienteReducer'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
    },   
    textField:{
        width: 450
    },
    select:{
        width: 200
    }
  }));


const PesquisaGrid = (props:any) =>{
    const classes = useStyles();

    return (
        <Card elevation={3}>
            <Box display="flex" p={1} >
                <Box m={1}>
                    <FormControl variant="outlined" size="small">
                        <InputLabel id="demo-simple-select-outlined-label" >Pesquisar Por:</InputLabel>
                        <Select className={classes.select}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Pesquisar Por:"
                            value={10}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box m={1} flexGrow={1}>
                    <TextField className={classes.textField}
                        id="outlined-textarea"
                        label="Pesquisa"
                        placeholder="Digite para localizar"
                        multiline
                        variant="outlined"    
                        size= "small" 
                    />
                </Box>

                <Box m={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<IconAdd />}
                        onClick={(e:any) => props.mostrarOcultarModal(true)}>
                        Adicionar
                    </Button>
                </Box>
                
            </Box>   
        </Card>
    );
}

const mapStateToProps = (state:any) => ({
    openModal: state.cliente.mostrarOcultarModal
})

const mapDispatchToProps = (dispatch:any) => bindActionCreators({ mostrarOcultarModal }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(PesquisaGrid)