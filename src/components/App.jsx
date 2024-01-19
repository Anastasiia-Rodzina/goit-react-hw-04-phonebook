import { nanoid } from "nanoid";
import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";


export const App = () => {
 
  // const contactId = useMemo(() => nanoid(), []);
  
 const [contacts, setContacts] = useState([
  {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
  {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
  {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
  {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
]);
 
const [filter, setFilter] = useState('')

const firstRender = useRef(true);

useEffect (() => {
 if (!firstRender.current) { 
 localStorage.setItem("my-contacts", JSON.stringify(contacts));
 } 
}, [contacts]);

useEffect (() => {
   firstRender.current =false;
  }, []);


const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };


    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else {
      setContacts(prevContacts => {
       return [...prevContacts, contact]});
    }
  };

  const deleteContact = id => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== id));
  };

  const changeFilter = ({target}) => {
    setFilter( target.value );
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
  }

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return  contact.name.toLowerCase().includes(normalizedFilter)
      }
    );
  };

  const visibleContacts = getVisibleContacts();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
       <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
        
      </>
    );
  }
