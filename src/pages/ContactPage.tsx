import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { deleteContact } from '../features/contacts/contactsSlice';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';

const ContactPage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    
      <div className="p-4 flex flex-col items-center">
        <Link to="/create-contact" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Create Contact
        </Link>
        {contacts.length === 0 ? (
          <div className="mt-4 p-4 border border-gray-300 rounded-md">
            <div className="text-center">
              <span className="text-4xl">❌</span>
              <p>No Contact Found</p>
              <p>Please add a contact from the Create Contact button</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2  w-10/12  gap-5">
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border border-gray-300 rounded-md shadow-sm flex flex-col justify-between items-center">
                <div>
                  <p className="font-semibold">{contact.firstName} {contact.lastName}</p>
                  <p>Status: {contact.status}</p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Link
                    to={`/edit-contact/${contact.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => dispatch(deleteContact(contact.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default ContactPage;
