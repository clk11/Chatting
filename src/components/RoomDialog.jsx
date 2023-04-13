import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const RoomDialog = ({ setRoom, login, open, setOpen }) => {
    return (
        <div>
            <Dialog open={open} onClose={() => { setOpen(false) }}>
                <DialogContent>
                    <DialogContentText>
                        Introduce the name of the room
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => { setRoom(e.target.value) }}
                        id="roomDialog"
                        label="Room : "
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={login}>Join</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default RoomDialog;