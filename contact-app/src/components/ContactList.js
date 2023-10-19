import React, {useRef} from 'react';
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom';
//we add brackets when it is not default component
const ContactList = (props) => {
   // console.log(props);
   const inputE1 = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id)
    } ;
    
    const renderContactList=props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact}
             clickHandler={deleteContactHandler}
             key = {contact.id}
            ></ContactCard>
        );
    });
    const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value)
    }
     return <div className="main">
     <h2>Contact List
     <Link to="/add">
     <button className="ui button blue right floated">Add Contact</button>
     </Link>
      </h2>
       <div className="ui search">
            <div className="ui icon input">
            <input ref={inputE1} type="text" value={props.term} placeholder="search contacts" className="prompt" onChange={getSearchTerm} />
            <i className="search icon"></i>
            </div>
       </div>
        <div className='ui celled list'>{renderContactList.length>0 ? renderContactList : <h2>"No contacts availabale"</h2>}</div>
     </div>
        
}
       


export default ContactList;