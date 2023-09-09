import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { DeleteEventDialog } from './DeleteEventDialog';
import { CreateEventDialog } from './CreateEventDialog';
import './Calendar.css';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';

import ViewContent from '../contentByLeds/ViewContent';

export default function EventCalendar(props) {
  const { id } = props;
  const dataGridRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [contentID, setcontentID] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchEventsFromAPI();
  }, []);

  const fetchEventsFromAPI = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/schedule/led-panel/5`);
      const data = await response.json();
      console.log(data);

      // Process the fetched data and convert it into a list of events
      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.DisplayContent.name, // Use "name" as the event title
        start: moment(event.created_at).format('YYYY-MM-DD HH:mm:ss'), // Convert "timestamp" to a Date object
        end: moment(event.end_time).format('YYYY-MM-DD HH:mm:ss'),
        display_content_id: event.display_content_id, // Added to store the content ID
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEventId(event.id);
  };

  const handleViewContent = (event) => {
    setcontentID(event.display_content_id);
  };

  const handleEventDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteDialog(true);
  };

  const handleCreateDialogOpen = () => {
    setShowCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setShowCreateDialog(false);
  };

  const handleEventCreated = (createdEvent) => {
    // Do something with the created event, e.g., update the events list
    setEvents([...events, createdEvent]);
  };

  const handleConfirmDelete = () => {
    // Call API to delete event from data source
    // After successful deletion, update the events list and close the dialog
    console.log('Deleting Event:', eventToDelete);
    // const deletedEventId = eventToDelete.id;
    // callDeleteApi(deletedEventId);
    setShowDeleteDialog(false);
    setEvents(events.filter((event) => event.id !== eventToDelete.id));
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setEventToDelete(null);
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'start', headerName: 'Start', flex: 1 },
    { field: 'end', headerName: 'End', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleViewContent(params.row)}
           
          >
           <ViewContent id={contentID} />
          </Button>
          <Button
            onClick={() => handleEventDelete(params.row)}
            variant="outlined"
            color="secondary"
          >
            Delete
          </Button>
          
        </div>
      ),
    },
  ];

  return (
    <div className="event-calendar">
       <Button
        style={{ background: 'orange', color: '#fff' }}
        variant="contained"
        onClick={handleCreateDialogOpen} // Open the create event dialog
      >
        Create Event
      </Button>
      <div className="event-list">
        <h3>Event List</h3>
        <div style={{ height: 400, width: 1000 }}>
          <DataGrid rows={events} columns={columns} pageSize={5} />
        </div>
      </div>
      <CreateEventDialog
        open={showCreateDialog}
        onClose={handleCreateDialogClose}
        onEventCreated={handleEventCreated}
        id={id} 
      />
      <DeleteEventDialog
        open={showDeleteDialog}
        event={eventToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
