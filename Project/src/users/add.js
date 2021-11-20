import { useState } from "react";
import './main.css';

function Add(props)
{
    const [names,setNames]= useState('');
    const [emails,setEmails]= useState('');

    const add= ()=> // add user
    {
        if(emails=='' || names=='') // check if entered user empty
        alert("you must enter name and email to add user!");

        else
        {
            if(emails.includes('@')) // check if entered email valid
            {
                let obj;
                let id= props.user.map(x=> x.id);
                
                if(id.length!=0) // check if new user not the first user in system
                {
                    id= Math.max(...id); // get last user id
                    obj={id: id+1, name: names, email: emails};
                }

                else // if new user the first user in system
                obj={id: 1, name: names, email: emails};

                props.added(obj); //add user to data

                document.getElementById("name").value=""; // clear name
                document.getElementById("email").value=""; // clear email

                props.callback(); // hide addUser box
            }

            else // if entered email that isn't valid
            alert("you must enter a validate email!"); 
        }
    }

    const cancel= ()=> // hide addUser box
    {
        props.callback();  
    }

    return(<div style={{borderStyle: "solid", borderColor: "black", width: "400px", height: "75px"}}>

        Name: <input type="text" id="name" onChange={e=> setNames(e.target.value)}/> <br/>
        Email: <input type="email" id="email" onChange={e=> setEmails(e.target.value)}/> <br/>

        <div className="Right">

            <input style={{backgroundColor: "yellow"}} type="button" value="Cancel" onClick={cancel}/>
            &nbsp;&nbsp;{/* 2 spaces */}
            <input style={{backgroundColor: "yellow"}} type="button" value="Add" onClick={add}/>&nbsp;
                
        </div>
    </div>)
}

export default Add;