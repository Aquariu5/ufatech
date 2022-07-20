import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {api} from '../api/api'
import { IBook } from '../iface/book';
interface ModalProps {
    open: boolean,
    setOpen: Function,
    contact?: IBook
    setContacts: Function
}
export const DeleteModal: React.FC<ModalProps> = ({open, setOpen, contact, setContacts}) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = () => {
    api.delete<IBook[]>('/', {data: {...contact}})
    .then(res => setContacts(res.data));
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Удаление записи</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={deleteRow}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;