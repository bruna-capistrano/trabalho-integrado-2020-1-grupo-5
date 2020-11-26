import React, {useState} from 'react';
import {useParams, useHistory, Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addAdmServer, updateAdmServer, selectAdmsById} from './AdmsSlice'
import {admSchema} from './AdmSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
  },

}));

export default function FormAdm(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = parseInt(id);

    const admFound = useSelector(state => selectAdmsById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(admSchema)
    });

    const [admOnLoad] = useState(
        id ? admFound ?? admSchema.cast({}): admSchema.cast({}));

    const [actionType, ] = useState(
        id  ? admFound 
                ? 'adms/updateAdm'
                : 'adms/addAdm'
            : 'adms/addAdm');

    function onSubmit(adm){
        if(actionType === 'adms/addAdm'){
            dispatch(addAdmServer(adm));
        }else{
            dispatch(updateAdmServer({...adm, id: admFound.id}));
        }
        
        history.push('/adms');
    }    

    return( <>
                <h1>{(admOnLoad.id ?? 0) === 0 ? "Novo Adm" : "Editar Adm"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="nome_adm" 
                        label="Nome" 
                        name="nome" 
                        defaultValue={admOnLoad.nome} 
                        inputRef={register}
                        helperText={errors.nome?.message} 
                        error={errors.nome_adm?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/>
                   <TextField 
                        id="usuario_adm" 
                        label="Usuário" 
                        name="usuario" 
                        defaultValue={admOnLoad.usuario} 
                        inputRef={register}
                        helperText={errors.usuario?.message} 
                        error={errors.usuario?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/>
                   <TextField 
                        id="senha_adm" 
                        label="Senha" 
                        name="senha" 
                        type="password"
                        defaultValue={admOnLoad.senha} 
                        inputRef={register}
                        helperText={errors.senha?.message} 
                        error={errors.senha?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/><br/>
                    <Button type="submit" id="salva_adm" name="salva_adm" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_adm" name="cancela_adm" variant="contained" onClick={() => { history.push('/adms') }}>Cancelar</Button>
                </form>
            </>
        );
}

export function VisualizarAdm() {
    const classes = useStyles(); 
    let { id } = useParams();
    id = parseInt(id);
 
    const admFound = useSelector(state => selectAdmsById(state, id))

    const [admOnLoad] = useState(
        id ? admFound ?? admSchema.cast({}): admSchema.cast({}));

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome:</b> {admOnLoad.nome} </Paper>
                        <Paper className={classes.paper}><b>Usuário:</b> {admOnLoad.usuario} </Paper>
                        <Paper className={classes.paper}><b>Senha:</b> {admOnLoad.senha} </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}