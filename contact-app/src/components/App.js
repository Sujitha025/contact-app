import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
//useEffect for using local storage
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import api from "../api/contacts"
// we are after using json.server for storing data in json files instead of local storage
function App() {
  //const LOCAL_STORAGE_KEY = "contacts";
  const [contacts,setContacts] = useState([]
      //JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
     );
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);
     //retrieve contacts from api folder
     const retrieveContacts = async () => {
      const response = await api.get("/contacts");
      return response.data
    } 
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id:uuidv4(),
      ...contact
    }
    //creating api call
    const response = await api.post("/contacts", request)
    setContacts([...contacts,response.data]);
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact)
    const {id,name,email} = response.data;
    setContacts(contacts.map(contact => {
        return contact.id === id ? {...response.data}:contact;
    }))
  };
 const searchHandler = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact) // gives only values not keys bcoz it is obj it has both keys and values we want only values for searching
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
 }
// the code inside related to json server for fetching data from json
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);

    };
    getAllContacts();
  },[])
  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts)); //localstorage in chrome inspect app_localhost->inspect->applications->localStarage
  } ,[contacts]);
  return (
    <div className="ui container">
      <Router>
      <Header/>
      <Routes>
      <Route 
      path="/add" 
      element={
      <AddContact 
      addContactHandler = {addContactHandler}
      />
      }
      />
      <Route 
      path="/" 
      element={
      <ContactList 
      contacts = {searchTerm.length< 1 ? contacts : searchResults} 
      getContactId = {removeContactHandler}
      term = {searchTerm}
      searchKeyword = {searchHandler}
      />
      }
      />
      <Route 
      path="/contact/:id"
      element={
      <ContactDetail
      contacts = {contacts}
      />
      }
      />
      <Route 
      path="/edit"
      element={
      <EditContact
      updateContactHandler = {updateContactHandler}
      />
      }
      />
      </Routes>
     
        {/* <AddContact addContactHandler = {addContactHandler} /> */}
        {/* <ContactList contacts = {contacts} getContactId = {removeContactHandler} /> */}
      </Router>
       
     </div>
  );
}

export default App;
