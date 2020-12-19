import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaJogador from './LinhaJogador';

/**
 * @module jogadores/TabelaJogadores
 */

/**
 * Renderiza a tabela de jogadores.
 * 
 * @param {object} props.jogadores - Lista de jogadores para ser exibida na tabela.
 * 
 */

 function TabelaJogadores(props) {
  if(props != null && props.jogadores != null && props.jogadores.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
            {props.jogadores.map((jogador) =><LinhaJogador key={jogador.id} jogador={jogador} 
                                    onClickExcluirJogador={props.onClickExcluirJogador}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>Não existem jogadores a serem exibidos.</div>)
  }
}

export default TabelaJogadores