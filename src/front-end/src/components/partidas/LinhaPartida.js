import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BotaoExcluir from '../layout/AlertDialog.js'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    image: {
      width : 30,
      height: "auto"
    }
  }));

/**
 * @module partidas/LinhaPartida
 */

 /**
 * @typedef Partida
 * @type {object}
 * @property {date} data - data da partida.
 * @property {string} time_A - nome do time A da partida.
 * @property {number} gols_time_A - quantidade de gols do time A da partida.
 * @property {number} gols_time_B - quantidade de gols do time B da partida.
 * @property {string} time_B - nome do time B da partida.
 */

 /**
  * Renderiza uma linha na listagem de partidas. 
  * Cada linha conterá a data, os times A e B e as respectivas quantidades de gols de cada time, juntamente com os botões para editar e excluir.
  * @param {Partida} props.partida - Partida a ser renderizada na linha.
  */

function LinhaPartida(props) {
  const classes = useStyles();

  if(props != null && props.partida != null && props.partida.id != null){
    return(
      <>
        <ListItem>
          <ListItem button component={Link} to = {`/partidas/visualizar/${props.partida.id}`}>
            <Grid className={classes.root} container direction="row">           
              <Grid direction="column" item xs={12} container alignItems="center">
                    <ListItemText secondary={new Date(props.partida.data).toLocaleDateString()}/>            
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center" >
                  <ListItemText secondary={props.partida.time_A}/>
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center">
                  <ListItemText>{props.partida.gols_time_A} X {props.partida.gols_time_B}</ListItemText>
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center">
                  
                  <ListItemText secondary={props.partida.time_B}/>
              </Grid>
            </Grid>        
          </ListItem>

          <Link to={`/partidas/${props.partida.id}`}><IconButton id="edita_partida" Link to={`/partidas/${props.partida.id}`} ><EditIcon/></IconButton></Link>
          
          <BotaoExcluir 
            id="deleta_partida" 
            name="excluir_partida"
            msg="Você está prestes a excluir a partida selecionada."
            funcao={props.onClickExcluirPartida} 
            chave={props.partida.id}
          />
          <br/>
        </ListItem>
      </>
    );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir a partida.</td></tr>)
  }
}

export default LinhaPartida;