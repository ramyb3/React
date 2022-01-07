import { useState, useEffect } from 'react';
import TasksComp from './tasks';

function First(props)
{
    const[check,setCheck]= useState();
    const [details,setDetails]= useState({id: 0, name: '', email: '', address:{street: '', city: '', zipcode: ''}});

    useEffect(()=>
    {    
        if(props.user.address) // if exist user
        {
            setDetails({id: props.user.id, name: props.user.name, email: props.user.email,
            address:{street: props.user.address.street, city: props.user.address.city,
            zipcode: props.user.address.zipcode}});
        }

        else // if new user
        {
            setDetails({id: props.user.id, name: props.user.name, email: props.user.email,
            address:{street: '', city: '', zipcode: ''}});
        }

        // check color of frame in start
        let color= props.todos.find(x=> x.completed==false);
    
        if(color!= undefined)
        setCheck("red");

        else
        setCheck("green");

    },[props]); //set details every time user change

    const close= ()=> //close box of other data
    {
        document.getElementById(props.user.id).style.visibility= "hidden";
    }

    const showData =()=> //show box of other data
    {
        document.getElementById(props.user.id).style.visibility= "visible";
    }

    const update =()=> //callback for parent comp to update user
    {
        let ok= true;

        if(details.name=='' || details.email=='' || details.address.city=='' || details.address.street=='' || details.address.zipcode== '')
        {
            alert('You must fill all form!');

            ok= false;
        }

        if(!details.email.includes('@'))
        {
            alert("You must enter a validate email!"); 

            ok= false;
        }

        if(ok==true)
        props.callback(details);
    }

    const deleteData =()=> //callback for parent comp to delete user
    {
        props.delete(props.user.id);
    }

    const color=()=> //change color of user box if clicked
    {
        let temp= true;

        if(document.getElementById(props.user.id+300).style.visibility== "hidden")
        {
            document.getElementById(props.user.id+100).style.backgroundColor= "#ffd9b3";
            document.getElementById(props.user.id+300).style.visibility= "visible";

            temp= false
        }

        if(document.getElementById(props.user.id+300).style.visibility== "visible" && temp==true)
        {
            document.getElementById(props.user.id+100).style.backgroundColor= "";
            document.getElementById(props.user.id+300).style.visibility= "hidden";
        }
    }

    const frame=()=> // check color of frame if mark completed
    {
        let color= props.todos.find(x=> x.completed==false);
    
        if(color!= undefined)
        setCheck("red");

        else
        setCheck("green");
    }

    return(<div>

        <div id={props.user.id+300} style={{visibility: "hidden"}}>

            <TasksComp tasks={props.todos} posts={props.posts} id={props.user.id} callback1={frame}
            callback2={data=> props.tasks(data)} callback3={data=> props.arr(data)}/>

        </div>

        <div id={props.user.id+100} style={{borderColor: check, borderStyle: "solid", width: "49%"}}> 

            <big> <b>
            <div onClick={color}> ID: {props.user.id} </div> <br/>
        
            Name: <input type="text" value={details.name} 
            onChange={e=> setDetails({id: details.id, name: e.target.value, email: details.email, address:
            {street: details.address.street, city: details.address.city, zipcode: details.address.zipcode}})}/> <br/>

            Email: <input type="email" value={details.email}
            onChange={e=> setDetails({id: details.id, name: details.name, email: e.target.value, address:
            {street: details.address.street, city: details.address.city, zipcode: details.address.zipcode}})}/> <br/><br/>
 
            </b></big>

            <input style={{backgroundColor: "grey", cursor: "pointer"}} type="button" value="Other Data" onClick={close} onMouseOver={showData}/>
            &nbsp;&nbsp;{/* 2 spaces */}
            <input style={{backgroundColor: "yellow", cursor: "pointer"}} type="button" value="Update" onClick={update}/>
            &nbsp;&nbsp;{/* 2 spaces */}
            <input style={{backgroundColor: "yellow", cursor: "pointer"}} type="button" value="Delete" onClick={deleteData}/> <br/><br/>

            <div id={props.user.id} style={{visibility:'hidden', borderColor: "black", borderStyle: "solid", backgroundColor: "whitesmoke"}}>
            
                Street: <input type="text" value={details.address.street} 
                onChange={e=> setDetails({id: details.id, name: details.name, email: details.email, address:
                {street: e.target.value, city: details.address.city, zipcode: details.address.zipcode}})}/> <br/>
                
                City: <input type="text" value={details.address.city} 
                onChange={e=> setDetails({id: details.id, name: details.name, email: details.email, address:
                {street: details.address.street, city: e.target.value, zipcode: details.address.zipcode}})}/> <br/>

                Zipcode: <input type="text" value={details.address.zipcode} 
                onChange={e=> setDetails({id: details.id, name: details.name, email: details.email, address:
                {street: details.address.street, city: details.address.city, zipcode: e.target.value}})}/> <br/>
        
            </div>
        </div> 
    </div>)
}

export default First;