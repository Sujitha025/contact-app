import React from "react";
import user from "../images/user.png";
import {Link} from "react-router-dom";
const ContactCard = (props) => {
    const {id,name,email} = props.contact;
    //console.log(props.contact);
   
    return (
            <div className='item'>
            <img className="ui avatar image" style={{marginTop:"5px"}} src = {user} alt="user"></img>
                <div className="content"  style={{marginTop:"5px",marginBottom:"5px"}}>
                    <Link to={`/contact/${id}`} state={{contact:props.contact}}>
                    <div className="header">{name}</div>
                        <div>{email}</div>
                    </Link> 
                </div>
                
                    <i className="trash right floated icon " 
                    style={{color:"red",marginTop:"10px",marginLeft:"10px"}}
                    onClick={() => props.clickHandler(id)}
                    ></i>
                    <Link to={`/edit`} state={{contact:props.contact}}>
                      <i className="edit alternate outline icon right floated" 
                    style={{color:"blue",marginTop:"10px"}}
                    ></i>
                    </Link>
                    
                    
            </div>
);

};
export default ContactCard;