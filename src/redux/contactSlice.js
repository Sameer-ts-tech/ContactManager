import { createSlice } from '@reduxjs/toolkit';


const loadContactsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  }
  return [];
};

const saveContactsToLocalStorage = (contacts) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: loadContactsFromLocalStorage(),
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
      saveContactsToLocalStorage(state);
    },
    editContact: (state, action) => {
      const index = state.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveContactsToLocalStorage(state);
      }
    },
    deleteContact: (state, action) => {
      const updatedContacts = state.filter(contact => contact.id !== action.payload);
      saveContactsToLocalStorage(updatedContacts);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
