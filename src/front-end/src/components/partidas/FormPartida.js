import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import {addPartidaServer, updatePartidaServer, selectPartidasById} from './PartidasSlice'
import {partidaSchema} from './PartidaSchema';
import {selectAllJogadores, fetchJogadores} from '../jogadores/JogadoresSlice'
import {selectAllTimes, fetchTimes} from '../times/TimesSlice'


const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    form: {
      '& > *': {
          margin: theme.spacing(1),
      },
    },
  
  }));


/**
 * @module partidas/FormPartida
 */

 /**
 * @typedef Partida
 * @type {object}
 * @property {string} id - identificador.
 * @property {date} data - data da partida.
 * @property {string} arbitro - árbitro da partida.
 * @property {string} local - local da partida.
 * @property {string} time_A - nome do time A da partida.
 * @property {number} gols_time_A - quantidade de gols do time A da partida.
 * @property {number} gols_time_B - quantidade de gols do time B da partida.
 * @property {string} time_B - nome do time B da partida.
 */

/**
 * Renderiza a tela com os campos para inclusão de uma nova partida ou a alteração dos dados da partida selecionada na lista. 
 */

 function FormPartida() {
    let { id } = useParams();
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes  = useStyles(); 

    const [jogadoresTimeA, setJogadoresTimeA] = useState([]);
    const [jogadoresTimeB, setJogadoresTimeB] = useState([]);
    const jogadores = useSelector(selectAllJogadores);
    const times     = useSelector(selectAllTimes);

    const addJogadorTimeA = () => {
        setJogadoresTimeA(jogadoresTimeA => [...jogadoresTimeA, <AdicionaJogador jogadores={jogadores} />]);
    };
  
    const addJogadorTimeB = () => {
        setJogadoresTimeB(jogadoresTimeB => [...jogadoresTimeB, <AdicionaJogador jogadores={jogadores} />]);
      };

    const partidaFound = useSelector(state => selectPartidasById(state, id))

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(partidaSchema)
    });

    const [partidaOnLoad, setPartida] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));

    const [actionType, ] = useState(
        id  ? partidaFound
                ? 'partidas/updatePartida'
                : 'partidas/addPartida'
            : 'partidas/addPartida');

    const handleChange = (event) => {
        alert(event.target.value)
        setPartida(event.target.value);
    };

    
    useEffect(() => {
        dispatch(fetchJogadores(jogadores))
        dispatch(fetchTimes(times))
    }, [] )
    
    function onSubmit(partida){
        if(actionType === 'partidas/addPartida'){
            dispatch(addPartidaServer(partida));
        }else{
            dispatch(updatePartidaServer({...partida, id: partidaFound.id}));
        }
        
        history.push('/partidas');
    }                

    return( <>
                <h1>{partidaOnLoad.id == null ? "Nova Partida" : "Editar Partida"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate autoComplete="off" >
                    {partidaOnLoad.id == null 
                    ?
                        <TextField 
                            id="data_partida" 
                            label="Data" 
                            name="data"
                            type="date"
                            defaultValue={partidaOnLoad.data} 
                            inputRef={register}
                            helperText={errors.data?.message} 
                            error={errors.data?.message ? true: false}
                            InputLabelProps={{ shrink: true }}
                            required
                            size="small"
                        />
                    :
                        <TextField 
                            id="data_partida" 
                            label="Data" 
                            name="data"
                            type="date"
                            defaultValue={partidaOnLoad.data.substring(0,10)} 
                            inputRef={register}
                            helperText={errors.data?.message} 
                            error={errors.data?.message ? true: false}
                            InputLabelProps={{ shrink: true }}
                            required
                            size="small"
                        />
                    }
                    <br/>
                    <TextField
                        id="arbitro_partida"
                        label="Árbitro" 
                        name="arbitro"
                        defaultValue={partidaOnLoad.arbitro} 
                        inputRef={register}
                        helperText={errors.arbitro?.message} 
                        error={errors.arbitro?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                        size="small"
                        required
                    />
                    <br/>
                    <TextField
                        id="local_partida"
                        label="Local" 
                        name="local"
                        defaultValue={partidaOnLoad.local} 
                        inputRef={register}
                        helperText={errors.local?.message} 
                        error={errors.local?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                        size="small"
                        required
                    />
                    <br/>                    
                    
                    <Grid container direction="row">
                        <Grid container direction="column" item xs={6} >
                            <Grid direction="row" justify="space-between">
                                <TextField
                                    id="id_time_A"
                                    label="Time A" 
                                    name="id_time_A"
                                    size="small"
                                    value={partidaOnLoad.id_time_A}
                                    inputRef={register}
                                    helperText={errors.id_time_A?.message} 
                                    error={errors.id_time_A?.message ? true: false} 
                                    InputLabelProps={{ shrink: true }}
                                    style = {{width: 100}}
                                    required
                                    select
                                    onChange={handleChange}>
                                    {times.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                &nbsp;&nbsp;&nbsp;
                                <TextField
                                    id="gols_time_A"
                                    label="Gols" 
                                    name="gols_time_A"
                                    type="number"
                                    size="small"
                                    defaultValue={partidaOnLoad.gols_time_A} 
                                    inputRef={register}
                                    helperText={errors.gols_time_A?.message} 
                                    error={errors.gols_time_A?.message ? true: false} 
                                    InputLabelProps={{ shrink: true }}
                                    style = {{width: 35}}
                                    required
                                />
                            </Grid>
                            <br/><br/>
                            <Grid container direction="row" justify="flex-start">
                                {jogadoresTimeA.map((item, i) => (<Grid key={i}>{item}</Grid>))}
                            </Grid>

                            <Grid container direction="row" justify="flex-start">
                                <IconButton 
                                    id="adiciona_jogador_A" 
                                    name="adiciona_jogador_A"
                                    onClick={() => {addJogadorTimeA()}} >
                                        <AddCircleIcon color='primary'/>
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid container direction="column" item xs={6}>
                            <Grid direction="row" justify="space-between">
                                <TextField
                                    id="gols_time_B"
                                    label="Gols" 
                                    name="gols_time_B"
                                    type="number"
                                    size="small"
                                    defaultValue={partidaOnLoad.gols_time_B} 
                                    inputRef={register}
                                    helperText={errors.gols_time_B?.message} 
                                    error={errors.gols_time_B?.message ? true: false} 
                                    InputLabelProps={{ shrink: true }}
                                    style = {{width: 35}}
                                    required
                                />
                                 &nbsp;&nbsp;&nbsp;
                                 <TextField
                                    id="id_time_B"
                                    label="Time B" 
                                    name="id_time_B"
                                    size="small"
                                    value={partidaOnLoad.id_time_B}
                                    inputRef={register}
                                    helperText={errors.id_time_B?.message} 
                                    error={errors.id_time_B?.message ? true: false} 
                                    InputLabelProps={{ shrink: true }}
                                    style = {{width: 100}}
                                    required
                                    select
                                    onChange={handleChange}>
                                    {times.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <br/><br/>
                            <Grid container direction="row" justify="flex-start">
                                {jogadoresTimeB.map((item, i) => (<Grid key={i}>{item}</Grid>))}
                            </Grid>
                            
                            <Grid container direction="row" justify="flex-start">
                                <IconButton 
                                    id="adiciona_jogador_B" 
                                    name="adiciona_jogador_B"
                                    onClick={() => {addJogadorTimeB()}} >
                                        <AddCircleIcon color='primary'/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
           
                    <br/><br/>
                    
                    <Button type="submit" id="salva_partida" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_partida" name="cancela_partida" variant="contained" onClick={() => { history.push('/partidas') }}>Cancelar</Button>
                </form>
            </>
        );
}


function AdicionaJogador(props) {
    return( <>
                <TextField
                    id="jogador"
                    label="Jogador"
                    name="jogador"
                    style = {{width: 100}}
                    select
                    InputLabelProps={{ shrink: true }}
                    size="small">
                    {props.jogadores.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    id="gols_jogador"
                    label="Gols"
                    name="gols_jogador"
                    type="number"
                    style = {{width: 35}}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    

                />
                <br/><br/>
            </>
    );
}

export default FormPartida