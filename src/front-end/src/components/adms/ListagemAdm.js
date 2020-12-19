import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteAdmServer, fetchAdms, selectAllAdms} from './AdmsSlice'
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TabelaAdms from './TabelaAdms'

/**
 * @module adms/ListagemAdms
 */

/**
 * Renderiza a tela de Listagem de Adms.
 * 
 */

function ListagemAdm() {
    const adms = useSelector(selectAllAdms)
    const status = useSelector(state => state.adms.status);
    const error = useSelector(state => state.adms.error);
    const dispatch = useDispatch();
  
      
    function handleClickExcluirAdm(id){
      dispatch(deleteAdmServer(id));
    }
  
    useEffect(() => {
      if (status === 'not_loaded' ) {
          dispatch(fetchAdms())
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchAdms()), 5000);
      }
    }, [status, dispatch])
  
  
    let tabelaAdms = '';
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      tabelaAdms = <TabelaAdms adms={adms} onClickExcluirAdm={handleClickExcluirAdm} />;
    }else if(status === 'loading'){
      tabelaAdms = <div>Carregando os adms...</div>;
    }else if(status === 'failed'){
      tabelaAdms = <div>Error: {error}</div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Adms</h1></div>
                </Box>
              </Box>
  
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <IconButton component={Link} to="/adms/novo" id="novo_adm" name="btn_novo_adm"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
                </Box>
              </Box>
              {tabelaAdms}
            </div>
            </>
    );
  }
  
  export default ListagemAdm