import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactSlice';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; 
import styles from './ContactCard.module.scss';

export default function ContactCard({ contact }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true); 
    setTimeout(() => {
      dispatch(deleteContact(contact.id)); 
    }, 500);
  };

  return (
    <div className={`${styles.contactCard} ${isDeleting ? styles.fadeOut : ''}`}>
      <h3>{contact.name}</h3>
      <p>{contact.phone}</p>
      <div className={styles.actions}>
        <Link href={`/edit/${contact.id}`}>
          <button className={`${styles.editBtn} ${styles.button}`}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        </Link>
        <button className={`${styles.deleteBtn} ${styles.button}`} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
}
