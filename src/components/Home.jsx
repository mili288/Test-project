import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingContact) {
      const updatedContact = {
        id: editingContact.id,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        country: country,
        email: email,
        phone: phone
      };

      const updatedContacts = contacts.map((contact) =>
        contact.id === editingContact.id ? updatedContact : contact
      );

      setContacts(updatedContacts);
      setEditingContact(null);
    } else {
      const newContact = {
        id: Math.random().toString(),
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        country: country,
        email: email,
        phone: phone
      };

      setContacts([...contacts, newContact]);
    }

    resetForm();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setAddress(contact.address);
    setCity(contact.city);
    setCountry(contact.country);
    setEmail(contact.email);
    setPhone(contact.phone);
    setShowForm(true);
  };

  const handleDelete = (contact) => {
    const updatedContacts = contacts.filter((c) => c.id !== contact.id);
    setContacts(updatedContacts);
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setAddress('');
    setCity('');
    setCountry('');
    setEmail('');
    setPhone('');
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <div className="app">
      <h1>Phone Book</h1>

      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={handleCityChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <div>
            <button type="submit">{editingContact ? 'Update Contact' : 'Add Contact'}</button>
            <button type="button" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Add New Contact</button>
      )}

      {contacts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName} {contact.lastName}</td>
                <td>{contact.address}, {contact.city}, {contact.country}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => handleEdit(contact)}>Edit</button>
                  <button onClick={() => handleDelete(contact)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default Home;
