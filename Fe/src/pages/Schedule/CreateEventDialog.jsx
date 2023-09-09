import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import axios from 'axios';

export function CreateEventDialog(props) {
  const { id,open, onClose, onEventCreated } = props;
  const [selectedContentId, setSelectedContentId] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [contentList, setContentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContentList();
    console.log(id);
  }, []);

  const fetchContentList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/display-content/led-panels/5`); // Update with the correct API endpoint
      
      const data = response.data;
      console.log(data);
      setContentList(data);
    } catch (error) {
      console.error('Error fetching content list:', error);
    }
  };

  const handleCreateEvent = async () => {
    if (eventStart >= eventEnd) {
      setErrorMessage('End time must be greater than start time');
      return;
    }
  
    try {
      const formattedStartTime = new Date(eventStart).toISOString();
      const formattedEndTime = new Date(eventEnd).toISOString();
  
      const response = await axios.post('http://localhost:8000/api/schedule', {
        ledPanelId: 5,
        displayContentId: selectedContentId,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
  
      // Clear error message
      setErrorMessage('');
  
      // Check if the response is successful
      if (response.status === 200) {
        // Clear input fields and close the dialog
        console.log(response.data)
        setSelectedContentId('');
        setEventStart('');
        setEventEnd('');
        onClose();
  
        // Notify parent component that an event was created
        if (onEventCreated) {
          onEventCreated(response.data);
        }
  
        // Show success message
        alert('Event created successfully');
      } else {
        // Show failure message
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      // Show failure message
      alert('Failed to create event');
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
      {errorMessage && (
    <p style={{ color: 'red' }}>{errorMessage}</p>
  )}
        <InputLabel>Content</InputLabel>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Content</InputLabel>
          <Select
            value={selectedContentId}
            onChange={(e) => setSelectedContentId(e.target.value)}
          >
            {contentList.map((content) => (
              <MenuItem key={content.display_content.id} value={content.display_content.id}>
                {content.display_content.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Start Time"
          type="datetime-local"
          value={eventStart}
          onChange={(e) => setEventStart(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          value={eventEnd}
          onChange={(e) => setEventEnd(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleCreateEvent} color="primary">
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}
