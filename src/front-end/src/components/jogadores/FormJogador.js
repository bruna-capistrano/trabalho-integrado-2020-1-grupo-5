import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {addJogadorServer, updateJogadorServer, selectJogadoresById} from './JogadoresSlice'
import {jogadorSchema} from './JogadorSchema';


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
 * @module jogadores/FormJogador
 */

 /**
 * @typedef Jogador
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do jogador.
 * @property {date} data_nascimento - data de nascimento do jogador.
 */

/**
 * Renderiza a tela com os campos para inclusão de um novo jogador ou a alteração dos dados do jogador selecionado na lista. 
 */

function FormJogador() {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();

    const jogadorFound = useSelector(state => selectJogadoresById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(jogadorSchema)
    });

    const [jogadorOnLoad] = useState(
        id ? jogadorFound ?? jogadorSchema.cast({}): jogadorSchema.cast({}));

    const [actionType, ] = useState(
        id  ? jogadorFound 
                ? 'jogadores/updateJogador'
                : 'jogadores/addJogador'
            : 'jogadores/addJogador');

    function onSubmit(jogador){
        if(actionType === 'jogadores/addJogador'){
            dispatch(addJogadorServer(jogador));
        }else{
            dispatch(updateJogadorServer({...jogador, id: jogadorFound.id}));
        }
        
        history.push('/jogadores');
    }    

    return( <>
                <h1>{jogadorOnLoad.id == null ? "Novo Jogador" : "Editar Jogador"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="nome_jogador" 
                        label="Nome" 
                        name="nome" 
                        defaultValue={jogadorOnLoad.nome} 
                        inputRef={register}
                        helperText={errors.nome?.message} 
                        error={errors.nome?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/>
                    {(jogadorOnLoad.id ?? 0) === 0 ? 
                        <TextField
                            id="data_nascimento_jogador"
                            type="date"
                            label="Data de nascimento" 
                            name="data_nascimento"
                            defaultValue= {jogadorOnLoad.data_nascimento}
                            inputRef={register}
                            helperText={errors.data_nascimento?.message} 
                            error={errors.data_nascimento?.message ? true: false} 
                            InputLabelProps={{ shrink: true }}
                        />
                    :   
                        <TextField
                            id="data_nascimento_jogador"
                            type="date"
                            label="Data de nascimento" 
                            name="data_nascimento"
                            defaultValue= {jogadorOnLoad.data_nascimento.substring(0,10)}
                            inputRef={register}
                            helperText={errors.data_nascimento?.message} 
                            error={errors.data_nascimento?.message ? true: false} 
                            InputLabelProps={{ shrink: true }}
                        />      
                    }
                    <br/><br/>
                    <Button type="submit" id="salva_jogador" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_jogador" name="cancela_jogador" variant="contained" onClick={() => { history.push('/jogadores') }}>Cancelar</Button>                    
                </form>
            </>
        );
}

export default FormJogador