import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/contactSlice';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import styles from './ContactForm.module.scss';
import { validateForm } from '../utils/validation';

export default function ContactForm({ initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

 
    const { nameError, phoneError } = validateForm(name, phone);
    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      setIsSaving(false);
      return;
    }

    if (initialData.id) {
      dispatch(editContact({ id: initialData.id, name, phone }));
    } else {
      dispatch(addContact({ id: Date.now(), name, phone }));
    }

    
    setTimeout(() => {
      setIsSaving(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className={styles.contactFormContainer}>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

        <button
          type="submit"
          className={`${styles.saveBtn} ${isSaving ? styles.saving : ''}`}
          disabled={isSaving}
        >
          {isSaving ? (
            <span>
              <FontAwesomeIcon icon={faSave} className={styles.icon} spin /> Saving...
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faSave} className={styles.icon} /> Save
            </span>
          )}
        </button>
      </form>
    </div>
  );
}