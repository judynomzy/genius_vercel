// src/components/EditorialBoard.js
import React, { useState } from 'react';

const initialMembers = [
  { id: 1, name: 'John Doe', position: 'Editor-in-Chief', faculty: 'Science', code: 'gmijpn24$' },
  { id: 2, name: 'Jane Smith', position: 'Managing Editor', faculty: 'Arts', code: 'gmijpn24$' },
  { id: 3, name: 'Alice Johnson', position: 'Associate Editor', faculty: 'Engineering', code: 'gmijpn24$' },
  { id: 4, name: 'Bob Brown', position: 'Technical Editor', faculty: 'Mathematics', code: 'gmijpn24$' },
];

const EditorialBoard = () => {
  const [members, setMembers] = useState(initialMembers);
  const [form, setForm] = useState({ id: '', name: '', position: '', faculty: '', code: '' });
  const [editing, setEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for actual authentication logic

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.code !== 'gmijpn24$' && !editing) {
      alert('Input correct code.');
      return;
    }
    if (editing) {
      const reason = prompt('Please provide a reason for the change');
      if (reason !== 'cos fee said so') {
        alert('Invalid reason. The update was not made.');
        return;
      }
      setMembers(members.map(member =>
        member.id === parseInt(form.id) ? { ...form, code: member.code } : member // Retain original code
      ));
      setEditing(false);
    } else {
      setMembers([...members, { ...form, id: members.length + 1, code: 'gmijpn24$' }]);
    }
    setForm({ id: '', name: '', position: '', faculty: '', code: '' }); // Reset form
  };

  const handleEdit = (member) => {
    setForm({ ...member }); // Remove code field when editing
    setEditing(true);
  };

  const handleDelete = (id) => {
    const reason = prompt('Please provide a reason for the deletion');
    if (reason === 'cos fee said so') {
      setMembers(members.filter(member => member.id !== id));
    } else {
      alert('Invalid reason. The deletion was not made.');
    }
  };

  return (
    <div className="p-4 bg-green-900 text-yellow-100">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">Editorial Board Members</h1>
      
      {/* Conditionally render the form based on authentication status */}
      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleInputChange}
              placeholder="ID"
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
              disabled={editing}
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
              required
            />
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleInputChange}
              placeholder="Position"
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
              required
            />
            <input
              type="text"
              name="faculty"
              value={form.faculty}
              onChange={handleInputChange}
              placeholder="Faculty"
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-900"
              required
            />
            {/* Conditionally render the code input field only when adding a new member */}
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
            {editing ? 'Update Member' : 'Add Member'}
          </button>
        </form>
      )}
      
      {/* Table displaying members */}
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-green-800 text-yellow-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Faculty</th>
            {/* Removed Code Column */}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-green-900 text-yellow-100 divide-y divide-gray-300">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{member.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{member.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{member.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{member.faculty}</td>
              {/* Removed Code Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-yellow-500 hover:text-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditorialBoard;
