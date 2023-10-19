import React from "react";
import user from "../images/user.jpg";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

const ContactDetail = (props) => {
    const location = useLocation();
   const  { contact } = location.state;
    // const {contact} = location.state || {};
    return (
           <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="contact-name"/>
                </div>
                <div className="content">
                    <div className="header">
                       {contact.name}
                    </div>
                    <div className="description">
                       {contact.email}
                    </div>
                </div>
            </div>
            <div className="center-div" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Link to="/">
                <button className="ui button blue center">
                    Back to contacts
                </button>
            </Link>
            </div>
           </div>
);

};
export default ContactDetail;