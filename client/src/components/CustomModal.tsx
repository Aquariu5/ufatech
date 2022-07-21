import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { useInput } from '../hooks/useInput';
import {api} from '../api/api'
import { IBook } from '../iface/book';
interface ModalProps {
    open: boolean,
    setOpen: Function,
    contact?: IBook
    modalName: 'Добавить' | 'Изменить',
    setContacts: Function
}
export const CustomModal: React.FC<ModalProps> = ({open, setOpen, contact, modalName, setContacts}) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  const save = () => {

    if (modalName === 'Изменить') {
      api.put<IBook[]>('/', {name: name.value, number: number.value, id: contact?.id})
      .then(res => setContacts(res.data));
    }
    else if (modalName === 'Добавить') {
      api.post<IBook[]>('/', {name: name.value, number: number.value})
      .then(res => setContacts(res.data.sort((a,b) => +b.id - +a.id)));
    }
    setOpen(false);
  }

  const [name, clearName, setName] = useInput('');
  const [number, clearNumber, setNumber] = useInput('');

  useEffect(() => {
    setName(contact?.name || '');
    setNumber(contact?.number || '');
  }, [contact]);

  console.log('name,', name.value, number.value);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            fullWidth
            variant="standard"
            {...name}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Телефон"
            type="number"
            fullWidth
            {...number}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={save}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomModal;