import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {selectTimesById} from './TimesSlice'
import {timeSchema} from './TimeSchema';


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
 * @module times/VisualizarTime
 */

 /**
 * @typedef Time
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do time.
 */

 /**
  * Renderiza a tela com os dados do time selecionado na linha.
 */

function VisualizarTime() {
    const classes = useStyles(); 
    let { id } = useParams();
 
    const timeFound = useSelector(state => selectTimesById(state, id))

    const [timeOnLoad] = useState(
        id ? timeFound ?? timeSchema.cast({}): timeSchema.cast({}));

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome: </b>{timeOnLoad.nome} </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}

export default VisualizarTime