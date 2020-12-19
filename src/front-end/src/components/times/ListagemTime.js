import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {deleteTimeServer, fetchTimes, selectAllTimes} from './TimesSlice'
import TabelaTimes from './TabelaTimes'


/**
 * @module times/ListagemTimes
 */

/**
 * Renderiza a tela de Listagem de Times.
 * 
 */

function ListagemTime() {
    const times = useSelector(selectAllTimes)
    const status = useSelector(state => state.times.status);
    const error = useSelector(state => state.times.error);
    const dispatch = useDispatch();
  
      
    function handleClickExcluirTime(id){
      dispatch(deleteTimeServer(id));
    }
  
    useEffect(() => {
      if (status === 'not_loaded' ) {
          dispatch(fetchTimes())
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchTimes()), 5000);
      }
    }, [status, dispatch])
  
  
    let tabelaTimes = '';
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      tabelaTimes = <TabelaTimes times={times} onClickExcluirTime={handleClickExcluirTime} />;
    }else if(status === 'loading'){
      tabelaTimes = <div>Carregando os times...</div>;
    }else if(status === 'failed'){
      tabelaTimes = <div>Error: {error}</div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Times</h1></div>
                </Box>
              </Box>
  
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <IconButton component={Link} to="/times/novo" id="novo_time" name="novo_time"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
                </Box>
              </Box>
              {tabelaTimes}
            </div>
            </>
    );
  }
  
  export default ListagemTime