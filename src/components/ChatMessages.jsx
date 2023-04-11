import React from "react";
import { List, ListItem, Typography,Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { v4 as uuidv4 } from 'uuid';
const ChatMessages = ({ messages }) => {
  function formatName(str) {
    if (str.length > 10)
      return str.slice(0, 10) + '...';
    return str;
  }
  return (
    <>
      <List sx={{ padding:'12px', height: '20rem', overflow: 'auto' }}>
        {messages.map(({ message, username }) => (
          <ListItem key={uuidv4()}>
            <Grid container spacing = {2}>
              <Grid item>
                <Chip onClick={() => { alert(username) }} avatar={<Avatar />} label={formatName(username)} />
              </Grid>
              <Grid item xs = {10}>
                <Typography sx={{ wordWrap: 'break-word', maxWidth: '480px' }}>
                  {message}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ChatMessages