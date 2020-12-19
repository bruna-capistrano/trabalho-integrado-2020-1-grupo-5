import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaAdm from './LinhaAdm';

/**
 * @module adms/TabelaAdms
 */

/**
 * Renderiza a tabela de adms.
 * 
 * @param {object} props.adms - Lista de adms para ser exibida na tabela.
 * 
 */

function TabelaAdms(props) {
  if(props != null && props.adms != null && props.adms.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
              {props.adms.map((adm) =><LinhaAdm key={adm.id} adm={adm} 
                                    onClickExcluirAdm={props.onClickExcluirAdm}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>Não existem adms a serem exibidos.</div>)
  }
}

export default TabelaAdms