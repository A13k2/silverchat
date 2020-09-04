import React, {useState, useEffect} from 'react';
import './App.css';
import { Container, Typography, Box, Grid, Card, TextField, Button } from '@material-ui/core';

import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACnCV1xwYk8CEkPOWMPVKokOSQi6xkRE8",
  authDomain: "silverchat-f096b.firebaseapp.com",
  databaseURL: "https://silverchat-f096b.firebaseio.com",
  projectId: "silverchat-f096b",
  storageBucket: "silverchat-f096b.appspot.com",
  messagingSenderId: "925622598178",
  appId: "1:925622598178:web:453e25e195f79cd1fee87b"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const messageCollection = db.collection('messages')
const messageDoc = messageCollection.doc('message');


function App() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  
  const handleSendMessage = () => {
    if (message.trim() === "" || message.length > 255) return;
    messageDoc.set({
      messages: firebase.firestore.FieldValue.arrayUnion({
        timestamp: new Date(),
        message
      })
    }, { merge: true });
    setMessage("");
  }

  useEffect(() => {
    messageDoc.onSnapshot(snap => setChatMessages(snap.data().messages));
  }, [])

  console.log(chatMessages)

  return (
    <Container maxWidth="md">
      <Box my={5}>
        <Grid direction="column" container spacing={3}>
          <Grid item>
      <Typography variant="h3" align="center">
        Willkommen bei Silverchat!
      </Typography>
          </Grid>
          <Grid item>
      <Typography variant="subtitle2" align="center">
        Der Chat der Zukunft!
      </Typography>
          </Grid>
          <Grid item>
            <Card>
              {chatMessages.map(chatMessage => (
                  <Grid container spacing={2}>
                    <Grid item>
                    <Typography color="textSecondary" variant="subtitle2">
                      {chatMessage.timestamp.toDate().toLocaleTimeString()}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                <Typography gutterBottom style={{marginLeft: "2rem"}}>{chatMessage.message}</Typography>
                    </Grid>
                  </Grid>
              ))}
            </Card>
          </Grid>
          <Grid item>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs>
                      <TextField value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" fullWidth />
                </Grid>
                <Grid item>
                  <Button color="primary" variant="contained" onClick={handleSendMessage}>Send</Button>
                </Grid>
              </Grid>
              </Grid>
            </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

export default App;
