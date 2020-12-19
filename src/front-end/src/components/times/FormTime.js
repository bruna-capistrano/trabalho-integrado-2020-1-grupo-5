import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {addTimeServer, updateTimeServer, selectTimesById} from './TimesSlice'
import {timeSchema} from './TimeSchema';


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
 * @module times/FormTime
 */

 /**
 * @typedef Time
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do time.
 */

/**
 * Renderiza a tela com os campos para inclusão de um novo time ou a alteração dos dados do time selecionado na lista. 
 */
 
function FormTime(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();

    const timeFound = useSelector(state => selectTimesById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(timeSchema)
    });

    const [timeOnLoad] = useState(
        id ? timeFound ?? timeSchema.cast({}): timeSchema.cast({}));

    const [actionType, ] = useState(
        id  ? timeFound 
                ? 'times/updateTime'
                : 'times/addTime'
            : 'times/addTime');

    function onSubmit(time){
        if(actionType === 'times/addTime'){
            dispatch(addTimeServer(time));
        }else{
            dispatch(updateTimeServer({...time, id: timeFound.id}));
        }
        
        history.push('/times');
    }    

    return( <>
                <h1>{timeOnLoad.id == null ? "Novo Time" : "Editar Time"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="nome_time" 
                        label="Nome" 
                        name="nome" 
                        defaultValue={timeOnLoad.nome} 
                        inputRef={register}
                        helperText={errors.nome?.message} 
                        error={errors.nome?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/><br/>
                    <Button type="submit" id="salva_time" name="salva_time" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_time" name="cancela_time" variant="contained" onClick={() => { history.push('/times') }}>Cancelar</Button>                    
                </form>
            </>
        );
}


export default FormTime