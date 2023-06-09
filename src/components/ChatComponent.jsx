import * as React from 'react';
import { Typography, Paper, Container, IconButton, Grid, Box, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ProgressBar from './ProgressBar'
import ChatUsers from './ChatUsers';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import UserMenu from './UserMenu';

//Commited 
const ChatComponent = ({ logout, user, socket }) => {
    //Modal
    const [open, setOpen] = useState(false);
    //
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    //
    useEffect(() => {
        getMessages();
    }, [])
    useEffect(() => {
        const handleReceivedMessage = obj => {
            setMessages(mess => [...mess, { message: obj.message, username: obj.user.username }]);
        };
        const handleGettingUsers = obj => {
            setUsers(obj);
        };
        const handleGettingMessages = obj => {
            if (obj == null)
                setMessages([]);
            else
                setMessages(obj);
        };

        socket.on('received_message', handleReceivedMessage);
        socket.on('getting_users', handleGettingUsers);
        socket.on('getting_messages', handleGettingMessages);

        return () => {
            socket.off('received_message', handleReceivedMessage);
            socket.off('getting_users', handleGettingUsers);
            socket.off('getting_messages', handleGettingMessages);
        };
    }, [socket]);
    //
    async function getMessages() {
        await socket.emit('get_messages', user.room);
    }
    async function getUsers() {
        setOpen(true);
        await socket.emit('get_users', user.room);
    }
    function handleMessageChange(e) {
        setMessage(e.target.value);
    }
    async function onSend() {
        if (message.length !== 0) {
            await socket.emit('send_message', { user, message });
            setMessages(mess => [...mess, { message: message, username: user.username }]);
            setMessage('');
            document.getElementById('message').value = '';
        }
    }
    return (
        <Container style={{ paddingTop: '50px', width: '700px' }}>
            {messages == null && (<ProgressBar />)}
            {messages != null && (
                <Paper elevation={5} sx={{ borderStyle: 'solid', borderColor: 'Grey' }}>
                    <ChatUsers open={open} setOpen={setOpen} users={users} />
                    <Box p={2}>
                        <Grid container spacing={4} sx={{ paddingBottom: '10px' }}>
                            <Grid item xs={10}>
                                <Typography variant='h6'>
                                    {'Room : ' + user.room}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <UserMenu onLogout={logout} onGetUsers={getUsers} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container justifyContent={'center'}>
                            <Grid item sx={{ height: '20rem' }} xs={12}>
                                <ChatMessages messages={messages} />
                            </Grid>
                            <Grid item sx={{ paddingTop: '40px' }}>
                                <TextField
                                    onKeyPress={(e) => { if (e.key == 'Enter') onSend() }}
                                    hiddenLabel
                                    id="message"
                                    variant="filled"
                                    size="small"
                                    sx={{ width: '500px' }}
                                    onChange={handleMessageChange}
                                />
                                <IconButton
                                    aria-label='send'
                                    onClick={onSend}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            )}
        </Container >
    )
}

export default ChatComponent
