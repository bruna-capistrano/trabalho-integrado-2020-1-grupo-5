import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BotaoExcluir from '../layout/AlertDialog.js'

/**
 * @module adms/LinhaAdm
 */

 /**
 * @typedef Adm
 * @type {object}
 * @property {number} id - identificador.
 * @property {string} nome - nome do adm.
  */

 /**
  * Renderiza uma linha na listagem de adms. 
  * Cada linha conterá o nome do adm, juntamente com os botões para editar e excluir.
  * @param {Adm} props.adm - Adm a ser renderizado na linha.
  */

function LinhaAdm(props) {
  if(props != null && props.adm != null && props.adm.id != null){
    return(
      <>
        <ListItem>
          <ListItem>
            <ListItem button component={Link} to = {`/adms/visualizar/${props.adm.id}`}>
              <ListItemText primary={props.adm.nome}/>
            </ListItem>
          </ListItem>          
          
          <Link to={`/adms/${props.adm.id}`}><IconButton id="edita_adm" Link to={`/adms/${props.adm.id}`} ><EditIcon/></IconButton></Link>
          
          <BotaoExcluir 
            id="deleta_adm" 
            name="deleta_adm"
            msg="Você está prestes a excluir o Adm selecionado."
            funcao={props.onClickExcluirAdm} 
            chave={props.adm.id}
          />
          </ListItem>          
      </>
    );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir adms.</td></tr>)
  }
}

export default LinhaAdm;