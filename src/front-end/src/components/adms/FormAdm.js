import React, {useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addAdmServer, updateAdmServer, selectAdmsById} from './AdmsSlice'
import {admSchema} from './AdmSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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


/**
 * @module adms/FormAdm
 */

 /**
 * @typedef Adm
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do adm.
 * @property {string} usuario - nome do usuário do adm.
 * @property {string} senha - senha do usuário do adm.
 */

/**
 * Renderiza a tela com os campos para inclusão de um novo adm ou a alteração dos dados do adm selecionado na lista. 
 */
 
function FormAdm(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();

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
                <h1>{admOnLoad.id == null ? "Novo Adm" : "Editar Adm"}</h1>

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

export default FormAdm