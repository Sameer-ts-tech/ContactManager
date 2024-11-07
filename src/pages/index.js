import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactCard from '../components/ContactCard';
import Link from 'next/link';
import { addContact } from '../redux/contactSlice';

export default function HomePage() {
  const contacts = useSelector((state) => state.contacts);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true); // Flag that client-side has mounted

    // Load contacts from localStorage if not already loaded in the Redux state
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts && contacts.length === 0) {
      JSON.parse(savedContacts).forEach((contact) => {
        dispatch(addContact(contact));
      });
    }
  }, [dispatch]);

  // Don't render the contacts list until after client-side mount
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h1>Contact Manager</h1>
      <Link href="/add">
        <button className='new'>Add New Contact</button>
      </Link>
      <div>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
