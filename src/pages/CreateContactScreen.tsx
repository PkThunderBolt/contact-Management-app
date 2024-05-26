import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../features/contacts/contactsSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const CreateContactScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = {
      id: uuidv4(),
      firstName,
      lastName,
      status,
    };
    dispatch(addContact(newContact));
    navigate('/contacts');
  };

  return (
    <div className="h-[80vh] flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Create Contact</h1>
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
            <input 
              type="text" 
              id="firstName" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required 
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
            <input 
              type="text" 
              id="lastName" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  value="Active" 
                  checked={status === 'Active'} 
                  onChange={() => setStatus('Active')} 
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  value="Inactive" 
                  checked={status === 'Inactive'} 
                  onChange={() => setStatus('Inactive')} 
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Contact</button>
            <button type="button" onClick={() => navigate('/contacts')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContactScreen;
