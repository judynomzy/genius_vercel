import React, { useState } from 'react';

const initialEvents = [
  { id: 1, name: 'Annual Conference', date: '2024-10-10', location: 'New York', picture: 'default-image.jpg', code: 'gmijpn24$' },
  { id: 2, name: 'Summer Workshop', date: '2024-08-15', location: 'San Francisco', picture: 'default-image.jpg', code: 'gmijpn24$' },
  // Add more events as needed
];

const Events = () => {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState({ id: '', name: '', date: '', location: '', picture: '', code: '' });
  const [editing, setEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for actual authentication logic

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, picture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editing) {
      // Adding a new event, validate code
      if (form.code !== 'gmijpn24$') {
        alert('Input correct code.');
        return;
      }
      setEvents([...events, { ...form, id: events.length + 1, picture: form.picture || 'default-image.jpg' }]);
    } else {
      // Editing an existing event, prompt for reason
      const reason = prompt('Please provide a reason for the change');
      if (reason !== 'cos fee said so') {
        alert('Invalid reason. The update was not made.');
        return;
      }
      setEvents(events.map(event =>
        event.id === parseInt(form.id) ? { ...form, picture: form.picture || event.picture, code: event.code } : event
      ));
      setEditing(false);
    }
    setForm({ id: '', name: '', date: '', location: '', picture: '', code: '' }); // Reset form
  };

  const handleEdit = (event) => {
    setForm({ ...event });
    setEditing(true);
  };

  const handleDelete = (id) => {
    const reason = prompt('Please provide a reason for the deletion');
    if (reason === 'cos fee said so') {
      setEvents(events.filter(event => event.id !== id));
    } else {
      alert('Invalid reason. The deletion was not made.');
    }
  };

  return (
    <div className="p-4 bg-black text-yellow-100">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">Events</h1>
      
      {/* Conditionally render the form based on authentication status */}
      {isLoggedIn && (
        <div className="bg-slate-600 text-black p-6 rounded-md shadow-md mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Event Name"
                className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
                required
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
                required
              />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
                required
              />
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
              />
              {/* Conditionally render the code input field only when adding a new event */}
              {!editing && (
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleInputChange}
                  placeholder="Code"
                  className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
                  required
                />
              )}
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-600"
            >
              {editing ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        </div>
      )}
      
      {/* Displaying events as boxes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-slate-200 text-black p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
            <p className="mb-2">Date: {event.date}</p>
            <p className="mb-2">Location: {event.location}</p>
            {event.picture && <img src={event.picture} alt={event.name} className="w-full h-40 object-cover rounded-md mb-2"/>}
            <button
              onClick={() => handleEdit(event)}
              className="text-yellow-500 hover:text-yellow-700 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
