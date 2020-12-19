import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {deleteJogadorServer, fetchJogadores, selectAllJogadores} from './JogadoresSlice'
import TabelaJogadores from './TabelaJogadores'

/**
 * @module jogadores/ListagemJogadores
 */

/**
 * Renderiza a tela de Listagem de jogadores.
 * 
 */

function ListagemJogador() {

    const jogadores = useSelector(selectAllJogadores)
    const status = useSelector(state => state.jogadores.status);
    const error = useSelector(state => state.jogadores.error);
    const dispatch = useDispatch();
  
      
    function handleClickExcluirJogador(id){
      dispatch(deleteJogadorServer(id));
    }
  
    useEffect(() => {
      if (status === 'not_loaded' ) {
          dispatch(fetchJogadores())
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchJogadores()), 5000);
      }
    }, [status, dispatch])
  
  
    let tabelaJogadores = '';
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      tabelaJogadores = <TabelaJogadores jogadores={jogadores} onClickExcluirJogador={handleClickExcluirJogador} />;
    }else if(status === 'loading'){
      tabelaJogadores = <div>Carregando os jogadores...</div>;
    }else if(status === 'failed'){
      tabelaJogadores = <div>Error: {error}</div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Jogadores</h1></div>
                </Box>
              </Box>
  
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <IconButton component={Link} to="/jogadores/novo" id="novo_jogador" name="btn_novo_jogador"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
                </Box>
              </Box>
              {tabelaJogadores}
            </div>
            </>
    );
  }

  export default ListagemJogador