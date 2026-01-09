
import React, { useState } from 'react';
import { AuthorizedPerson } from '../types';

interface AuthorizedDatabaseProps {
  people: AuthorizedPerson[];
  onAdd: (person: AuthorizedPerson) => void;
  onRemove: (id: string) => void;
}

export const AuthorizedDatabase: React.FC<AuthorizedDatabaseProps> = ({ people, onAdd, onRemove }) => {
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<AuthorizedPerson['role']>('Student');

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAdd({
      id: Date.now().toString(),
      name: newName,
      role: newRole
    });
    setNewName('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6 text-slate-900">Manage Authorized Database</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Person's Full Name"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <select 
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as AuthorizedPerson['role'])}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Add to Database
          </button>
        </div>

        <div className="overflow-hidden border border-slate-200 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Role</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {people.map(person => (
                <tr key={person.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{person.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      person.role === 'Admin' ? 'bg-red-100 text-red-600' :
                      person.role === 'Teacher' ? 'bg-blue-100 text-blue-600' :
                      person.role === 'Staff' ? 'bg-purple-100 text-purple-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {person.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onRemove(person.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {people.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                    The authorized database is currently empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
