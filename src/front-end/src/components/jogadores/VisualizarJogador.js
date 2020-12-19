import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {selectJogadoresById} from './JogadoresSlice'
import {jogadorSchema} from './JogadorSchema';


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
          width: '25ch',
      },
    },
  
  }));


/**
 * @module jogadores/VisualizarJogador
 */

 /**
 * @typedef Jogador
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do jogador.
 * @property {date} data_nascimento - data de nascimento do jogador.
   */

 /**
  * Renderiza a tela com os dados do jogador selecionado na linha.
 */

 function VisualizarJogador() {
    let { id } = useParams();
 
    const jogadorFound = useSelector(state => selectJogadoresById(state, id))

    const [jogadorOnLoad] = useState(
        id ? jogadorFound ?? jogadorSchema.cast({}): jogadorSchema.cast({}));

    const classes = useStyles(); 

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome:</b> {jogadorOnLoad.nome} </Paper>
                        <Paper className={classes.paper}><b>Data de Nascimento: </b>{new Date(jogadorOnLoad.data_nascimento).toLocaleDateString()}</Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}

export default VisualizarJogador;