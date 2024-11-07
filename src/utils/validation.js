export const validateName = (name) => {
    if (!name) {
      return 'Name is required.';
    }
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      return 'Name can only contain letters and spaces.';
    }
    return null;
  };
  

  export const validatePhone = (phone) => {
    if (!phone) {
      return 'Phone number is required.';
    }
    const regex = /^[0-9]{10}$/; 
    if (!regex.test(phone)) {
      return 'Phone number must be 10 digits.';
    }
    return null; 
  };
  
 
  export const validateForm = (name, phone) => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    return { nameError, phoneError };
  };