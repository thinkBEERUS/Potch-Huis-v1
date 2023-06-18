import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const NewsEventsPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Simulating fetching messages from the backend
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // Replace this code with your backend API call to fetch messages
    // Example code: axios.get('/api/messages')
    // On success, update the messages state with the fetched data
    const fetchedMessages = [
      {
        id: 1,
        content: "Welcome to our website!",
        timestamp: new Date("2023-06-01T12:00:00").toLocaleString(),
      },
      {
        id: 2,
        content: "Check out our upcoming event on July 15th!",
        timestamp: new Date("2023-06-05T14:30:00").toLocaleString(),
      },
    ];

    setMessages(fetchedMessages);
  };

  const handlePostMessage = () => {
    // Replace this code with your backend API call to post a message
    // Example code: axios.post('/api/messages', { content: newMessage })
    // On success, fetch the updated messages and reset the new message input
    fetchMessages();
    setNewMessage("");
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        News & Events
      </Typography>

      <Typography variant="h6" gutterBottom>
        Post a Message:
      </Typography>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        variant="outlined"
        placeholder="Type your message here"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" onClick={handlePostMessage}>
        Post
      </Button>

      <Typography variant="h6" gutterBottom sx={{ marginTop: "24px" }}>
        Messages:
      </Typography>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "16px",
            marginTop: "12px",
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
          <Typography variant="caption" color="textSecondary">
            {message.timestamp}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NewsEventsPage;
