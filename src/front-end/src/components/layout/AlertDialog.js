import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function BotaoExcluir(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
      
    const handleClose = () => {
      setOpen(false);
    };
      
    return (
        <>
            <IconButton id={props.id} name={props.name} onClick={handleClickOpen}><DeleteIcon /></IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Deseja mesmo excluir o item?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.msg}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <IconButton id="cancelar_item" onClick={handleClose}>
                    Cancelar
                </IconButton>
                <IconButton id="excluir_item" onClick={() => {props.funcao(props.chave)}} color="secondary" autoFocus>
                    Excluir
                </IconButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
