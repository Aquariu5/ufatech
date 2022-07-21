import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Modal, Typography } from '@mui/material'
import { api } from '../api/api'
import {IBook } from '../iface/book';
import CustomModal from './CustomModal';
import DeleteModal from './DeleteModal';

const Book = () => {
    const [contacts, setContacts] = useState<IBook[]>([]);
    useEffect(() => {
        api.get<IBook[]>('/')
        .then(res => setContacts(res.data.sort((a,b) => +b.id - +a.id)));
    }, [])

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [modalName, setModalName] = useState<'Добавить' | 'Изменить'>('Добавить');
  const [contact, setContact] = useState<IBook>();

  const add = () => {
    setOpen(true);
    setModalName('Добавить');
  }

  const edit = (contact: IBook) => {
    setOpen(true);
    setContact(contact);
    setModalName('Изменить')
  }

  const deleteRow = (contact: IBook) => {
    // api.delete<IBook[]>('/', {data: {...contact}})
    // .then(res => setContacts(res.data));
    setOpenDelete(true);
    setContact(contact);
  }

  return (
    <Box p={4}>
        <Grid container direction={'row'} gap={2}>
            <Grid item md={8}>
                {
                    contacts.map(contact => <Card key={contact.id} sx={{border: '1px dashed gray'}}>
                        <CardHeader>Телекнига</CardHeader>
                        <CardContent>
                            <Grid container gap={2} justifyContent={'space-between'}>
                                <Grid item>
                                    <Typography p={1} color={'CaptionText'}>
                                        {contact.name}
                                    </Typography>
                                    <Typography p={1}  color={'GrayText'}>
                                        {contact.number}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => edit(contact)}>Изменить</Button>
                                    <Button onClick={() => deleteRow(contact)}>Удалить</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    )
                }
            </Grid>
            <Grid>
                <Button onClick={add} variant={'contained'}>Добавить</Button>
            </Grid>
        </Grid>
        <CustomModal
            open={open}
            setOpen={setOpen}
            contact={contact}
            modalName={modalName}
            setContacts={setContacts}
        />
        <DeleteModal
            open={openDelete}
            setOpen={setOpenDelete}
            contact={contact}
            setContacts={setContacts}
        />
    </Box>
    
  )
}

export default Book