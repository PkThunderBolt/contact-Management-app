import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact } from '../features/contacts/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { Contact } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ContactFormProps {
  contact?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact }) => {
  const [firstName, setFirstName] = useState(contact ? contact.firstName : '');
  const [lastName, setLastName] = useState(contact ? contact.lastName : '');
  const [status, setStatus] = useState<'Active' | 'Inactive'>(contact ? contact.status : 'Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams<{ contactId: string }>();

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const currentContact = contactId ? contacts.find(c => c.id === contactId) : null;

  useEffect(() => {
    if (currentContact) {
      setFirstName(currentContact.firstName);
      setLastName(currentContact.lastName);
      setStatus(currentContact.status);
    }
  }, [currentContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      id: currentContact ? currentContact.id : uuidv4(), // Use uuidv4 to generate id
      firstName,
      lastName,
      status,
    };
    if (currentContact) {
      dispatch(editContact(newContact));
    } else {
      dispatch(addContact(newContact));
    }
    navigate('/contacts');
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h1 className="text-2xl font-bold mb-4">{currentContact ? 'Edit Contact' : 'Create Contact'}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-gray-100 rounded-md shadow-lg">
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {currentContact ? 'Save Edited Contact' : 'Save Contact'}
          </button>
          <button type="button" onClick={() => navigate('/contacts')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
