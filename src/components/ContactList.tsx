import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { deleteContact } from '../features/contacts/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (contactId: string) => {
    navigate(`/edit-contact/${contactId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Contact List</h1>
      <div className="flex justify-center mb-4"> {/* Centering container */}
        <div className="text-center"> {/* Text center container */}
          <Link to="/create-contact" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Contact
          </Link>
        </div>
      </div>
      {contacts.length === 0 ? (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <div className="text-center">
            <span className="text-4xl">❌</span>
            <p>No Contacts Found</p>
            <p>Please add a contact using the Create Contact button</p>
          </div>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="p-4 border border-gray-300 rounded-md">
              <p className="font-semibold">{contact.firstName} {contact.lastName}</p>
              <p>Status: {contact.status}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(contact.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteContact(contact.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
