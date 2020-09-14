import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import IconEdit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5)
    },   
    table: {
        margin: theme.spacing(2),
        width:"97%"       
    }
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.text.secondary,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      borderBottom: '5px solid rgba(244, 244, 244, 244)'
    },
  }))(TableRow);

function createData(name:string, telefone:string, sexo:string, email:string, dataNascimento:string, status:string) {
  return { name, telefone, sexo, email, dataNascimento, status};
}

const rows = [
  createData('Frozen yoghurt', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Ice cream sandwich', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Eclair', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Cupcake', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread1',"11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Inativo"),
  createData('Gingerbread2',"11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread3',"11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread4',"11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread5', "11 9825-28825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Inativo"),
  createData('Gingerbread6', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread7', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
  createData('Gingerbread8', "11 98252-8825","Masculino","tony.abrunhosa@hotmail.com", "15/12/1989","Ativo"),
];

const Cliente = () =>{
    const classes = useStyles();

    return (
       <Card elevation={3}>
            <Box minWidth={1050}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                          <StyledTableCell>Nome</StyledTableCell>
                          <StyledTableCell>Telefone</StyledTableCell>
                          <StyledTableCell>Sexo</StyledTableCell>
                          <StyledTableCell>E-mail</StyledTableCell>
                          <StyledTableCell>Data de Nascimento</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell width={170}>{row.telefone}</StyledTableCell>
                            <StyledTableCell width={100}>{row.sexo}</StyledTableCell>
                            <StyledTableCell width={350}>{row.email}</StyledTableCell>
                            <StyledTableCell width={170}>{row.dataNascimento}</StyledTableCell>
                            <StyledTableCell width={100}>{row.status}</StyledTableCell>
                            <StyledTableCell width={8}>
                              <Tooltip title="Editar">
                                <IconButton aria-label="edit" size="small">
                                  <IconEdit/>
                                </IconButton>
                              </Tooltip>
                            
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>

                </Table>          
            </Box>  
            
        </Card>

    );

    
}

export default Cliente;