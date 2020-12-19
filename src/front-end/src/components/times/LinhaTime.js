import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BotaoExcluir from '../layout/AlertDialog.js'

/**
 * @module times/LinhaTime
 */

 /**
 * @typedef Time
 * @type {object}
 * @property {number} id - identificador.
 * @property {string} nome - nome do time.
  */

 /**
  * Renderiza uma linha na listagem de times. 
  * Cada linha conterá o nome do time, juntamente com os botões para editar e excluir.
  * @param {Time} props.time - Time a ser renderizado na linha.
  */

function LinhaTime(props) {
  if(props != null && props.time != null && props.time.id != null){
    return(
      <>
        <ListItem>
          <ListItem>
            <ListItem button component={Link} to = {`/times/visualizar/${props.time.id}`}>
              <ListItemText primary={props.time.nome}/>
            </ListItem>
          </ListItem>
          
          <Link to={`/times/${props.time.id}`}><IconButton id="edita_time" Link to={`/times/${props.time.id}`} ><EditIcon/></IconButton></Link>
        
          <BotaoExcluir 
            id="deleta_time" 
            name="deleta_time"
            msg="Você está prestes a excluir o time selecionado."
            funcao={props.onClickExcluirTime} 
            chave={props.time.id}
          />
        </ListItem>          
      </>
    );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir times.</td></tr>)
  }
}

export default LinhaTime;