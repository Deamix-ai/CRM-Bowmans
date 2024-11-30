import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        console.log('Current date type:', typeof date, 'Is instance of Date:', date instanceof Date);
    }, [date]);

    const handleDateChange = (newDate) => {
        console.log('Date changed to:', newDate);
        if (newDate instanceof Date) {
            setDate(newDate);
        } else {
            setDate(new Date(newDate));
        }
        console.log("Date after change:", date);
    };

    const handleAddEvent = (newEvent) => {
        console.log('Handling Event Submit:', newEvent);
        console.log('New event date:', new Date(newEvent.date).toISOString().split('T')[0]);
        if (selectedEvent) {
            const updatedEvents = events.map((event) =>
                event === selectedEvent ? { ...event, ...newEvent, date: new Date(newEvent.date).toISOString().split('T')[0] } : event
            );
            console.log('Updated Events:', updatedEvents);
            setEvents(updatedEvents);
            setSelectedEvent(null); // Reset editing state
        } else {
            setEvents([...events, { ...newEvent, date: new Date(newEvent.date).toISOString().split('T')[0] }]);
        }
        console.log('Events after update:', events);
    };

    const handleEditEvent = (eventToEdit) => {
        console.log('Editing event:', eventToEdit);
        setSelectedEvent(eventToEdit);
        setDate(new Date(eventToEdit.date)); // Ensure this is always a Date object
        console.log('Event date for edit:', eventToEdit.date);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Calendar</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                style={{ margin: '0 auto' }}
            />
            <div style={{ marginTop: '20px' }}>
                <h2>Selected Date: {date instanceof Date ? date.toDateString() : new Date(date).toDateString()}</h2>
            </div>

            <EventForm
                addEvent={handleAddEvent}
                selectedEvent={selectedEvent}
                isEditMode={selectedEvent !== null}
            />

            <div>
                <h3>Events on {date instanceof Date ? date.toDateString() : new Date(date).toDateString()}</h3>
                <ul>
                    {events
                        .filter((event) => {
                            console.log('Filtering event date:', event.date, 'vs', date.toISOString().split('T')[0]);
                            return event.date === (date instanceof Date ? date.toISOString().split('T')[0] : date);
                        })
                        .map((event, index) => (
                            <li key={index}>
                                {event.eventType} - {event.startTime} to {event.endTime}
                                <br />
                                {event.description}
                                <br />
                                <button onClick={() => handleEditEvent(event)}>Edit</button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default CalendarPage;