// src/api/contacts.ts
import { Contact } from '../types';

export const fetchContacts = async (): Promise<Contact[]> => {
  // This is a mock implementation. Replace with an actual API call.
  return [
    { id: '1', firstName: 'John', lastName: 'Doe', status: 'Active' },
    { id: '2', firstName: 'Jane', lastName: 'Doe', status: 'Inactive' },
  ];
};
