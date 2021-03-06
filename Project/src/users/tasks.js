import { useState, useEffect } from 'react';
import './main.css';

function TasksComp(props)
{
    const [tasks,setTasks]= useState([]);
    const [showTodo,setTodo]= useState(true);
    const [showPost,setPost]= useState(true);
    const [newTask,setNewTask]= useState('');
    const [newTitle,setNewTitle]= useState('');
    const [newBody,setNewBody]= useState('');

    useEffect(()=>
    {
        setTasks(props.tasks);
    },[props]); //set tasks every time user change

    const mark = (e)=> // check completed task or not
    {
        let obj= tasks.find(x=> x.id==props.tasks[e.target.name].id);
        obj.completed= true;

        let arr=tasks.filter(x=> x.id!=props.tasks[e.target.name].id);
        
        setTasks([obj,...arr]);

        props.callback1(); // check color of frame
    }

    const addPost = ()=> //open add post box
    {
        setPost(false); 
    }

    const addTodo = ()=> //open add todo box
    {
        setTodo(false); 
    }

    const cancel= (e)=> //show all todos/posts
    {
        if(e.target.id=="todo")
        setTodo(true);

        else
        setPost(true);
    }

    const add= (e)=> //add todo/post to all todos/posts
    {
        if(e.target.id=="todo")
        {
            if(newTask!='') //if task not empty
            {
                let obj={userId: props.id, id: tasks.length+1, title: newTask, completed: false};

                props.callback2(obj); // add this todo to all todos
                setTodo(true); //show all todos
            }

            else
            alert("You must enter some title!!"); //if entered todo empty  
        }

        else
        {
            if(newTitle!='' && newBody!='') //if post not empty
            {
                let obj={userId: props.id, id: props.posts.length+1, title: newTitle, body: newBody};

                props.callback3(obj); // add this post to all posts
                setPost(true); //show all todos
            }

            else
            alert("You must enter title and body!!"); //if entered post empty
        }
    }

    return(<div style={{height: '3in', overflowY: "scroll", float: "right",  width: "49%"}}>

        { showTodo==true ? //check if clicked add todo
        
            <div className='box'>
                <input className="right button"  type="button" value="Add" onClick={addTodo}/>

                <h3> Todos - User {props.id}</h3>
                
                {
                    props.tasks.map((x,index)=> //all todos
                    {
                        return(<div key={index}><div className='box' style={{borderColor: "purple", minHeight: '45px'}}>
                            
                            <b>Title:</b> {x.title} <br/> <b>Completed:</b>  {x.completed.toString()} &nbsp;&nbsp;
                            
                            {x.completed==false ?  //check if task complete

                                <input className="button" name={index} type="button" value="Mark Completed" onClick={mark}/>
                                : null
                            }

                            </div><br/>
                        </div>)
                    })
                }
            </div> : 

            <div> 
                <h3> New Todo - User {props.id}</h3>

                <div className='box' style={{height: '50px'}}>

                    &nbsp;<input placeholder='Title' style={{width: '40%'}} type="text" onChange={e=> setNewTask(e.target.value)}/><br/>

                    <div className='right'> 

                        <input className="button" type="button" id="todo" value="Cancel" onClick={cancel}/>
                        &nbsp;&nbsp;
                        <input className="button" type="button" id="todo" value="Add" onClick={add}/>&nbsp;
                        
                    </div>
                </div>
            </div>
        } <br/> 

        { showPost==true ? //check if clicked add post

            <div className='box'>

                <input className="right button" type="button" value="Add" onClick={addPost}/>

                <h3> Posts - User {props.id}</h3>
                
                {
                    props.posts.map((x,index)=> //all posts
                    {
                        return(<div key={index}><div className='box' style={{borderColor: "purple"}}>
                            
                            <b>Title:</b> {x.title} <br/> <br/><b>Body:</b>  {x.body} <br/></div><br/>
                        </div>)
                    })
                }
            </div>  :

            <div>
                <h3> New Post - User {props.id}</h3>

                <div className='box' style={{height: "93px"}}>

                    &nbsp;<input placeholder='Title' style={{width: '40%'}} type="text" onChange={e=> setNewTitle(e.target.value)}/><br/><br/>
                    &nbsp;<input placeholder='Body' style={{width: '40%'}} type="text" onChange={e=> setNewBody(e.target.value)}/><br/>

                    <div className="right">

                    <input className="button" type="button" id="post" value="Cancel" onClick={cancel}/>
                    &nbsp;&nbsp;{/* 2 spaces */}
                    <input className="button" type="button" id="post" value="Add" onClick={add}/>&nbsp;
                        
                    </div>
                </div>
            </div>
        }
    </div>)
}

export default TasksComp