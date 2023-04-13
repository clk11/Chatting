import React, { useRef, useEffect } from "react";
import { List, ListItem, Typography, Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { v4 as uuidv4 } from 'uuid';

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  function formatName(str) {
    if (str.length > 10)
      return str.slice(0, 10) + '...';
    return str;
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <List sx={{ height: '20rem', overflow: 'auto' }}>
        {messages.map(({ message, username }) => (
          <ListItem key={uuidv4()} divider>
            <Grid container spacing={2}>
              <Grid item>
                <Chip onClick={() => { alert(username) }} avatar={<Avatar />} label={formatName(username)} />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ wordWrap: 'break-word', maxWidth: 'auto' }}>
                  {message}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
    </>
  );
}

export default ChatMessages;
