import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ContactForm from '../../components/ContactForm';

export default function EditContactPage() {
  const router = useRouter();
  const { id } = router.query;
  const contact = useSelector((state) => state.contacts.find((c) => c.id === parseInt(id)));

  return (
    <div>
      <h1>Edit Contact</h1>
      {contact && <ContactForm initialData={contact} />}
    </div>
  );
}
