import React from 'react';
import { useParams } from 'react-router-dom';
import EventCalendar from './Calendar';

export default function EventCalendarPage() {

    const { id } = useParams();
  return (
    <div>
      <h1>Event Calendar Page</h1>
      <EventCalendar id={id} />
    </div>
  );
}
