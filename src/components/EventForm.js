import React, { useEffect } from 'react';

const EventForm = ({ addEvent, selectedEvent, isEditMode }) => {
    const eventTypes = [
        'Consultation',
        'Presentation',
        'Design Time',
        'Day Off',
        'Holiday',
        'Design Review',
        'Installation',
        'Remedial',
    ];

    const [eventType, setEventType] = React.useState('Consultation');
    const [date, setDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('09:00');
    const [endTime, setEndTime] = React.useState('10:00');
    const [description, setDescription] = React.useState('');
    const [isRecurring, setIsRecurring] = React.useState(false);

    useEffect(() => {
        if (selectedEvent) {
            console.log('Setting form values from selected event:', selectedEvent);
            setEventType(selectedEvent.eventType || 'Consultation');
            setDate(selectedEvent.date || '');
            setStartTime(selectedEvent.startTime || '09:00');
            setEndTime(selectedEvent.endTime || '10:00');
            setDescription(selectedEvent.description || '');
            setIsRecurring(selectedEvent.isRecurring || false);
        }
    }, [selectedEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted: Date type:', typeof date, 'Is Date?', date instanceof Date);
        console.log('Form Submitted:', {
            eventType,
            date,
            startTime,
            endTime,
            description,
            isRecurring,
        });

        // Convert date to Date object for consistency
        const dateObj = new Date(date);
        addEvent({
            eventType,
            date: dateObj.toISOString().split('T')[0],
            startTime,
            endTime,
            description,
            isRecurring,
        });

        // Clear the form after submission if it's a new event
        if (!isEditMode) {
            setDescription('');
            setDate('');
            setStartTime('09:00');
            setEndTime('10:00');
            setEventType('Consultation');
        }
    };

    const handleButtonClick = (e) => {
        console.log("Button clicked");
        e.preventDefault();
        handleSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Event Type:</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    {eventTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Start Time:</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <div>
                <label>End Time:</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Recurring:</label>
                <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                />
            </div>
            <button
                type="submit"
                onClick={handleButtonClick}
            >
                {isEditMode ? 'Save Edit' : 'Add Event'}
            </button>
        </form>
    );
};

export default EventForm;