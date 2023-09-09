import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import axios from 'axios';

export function DeleteEventDialog(props) {
  const { open, event, onCancel, onConfirm } = props;
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      // Call the API to delete the event based on its ID
      console.log(event.id);
      const response = await axios.delete(`http://localhost:8000/api/schedule/${event.id}`);
      
      // If the deletion is successful, call the onConfirm callback
      if (response.status === 200) {
        onConfirm();
      } else {
        console.error('Error deleting event:', response.data);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <p>Are you sure you want to delete the event "{event ? event.title : ''}"?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="default" disabled={deleteLoading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" disabled={deleteLoading}>
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
