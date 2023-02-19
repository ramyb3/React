import { useState, useEffect } from "react";
import "../App.css";

export default function TasksComp(props) {
  const [tasks, setTasks] = useState([]);
  const [showTodo, setTodo] = useState(true);
  const [showPost, setPost] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  //set tasks every time user change
  useEffect(() => {
    setTasks(props.tasks);
  }, [props]);

  // check completed task or not
  const mark = (e) => {
    const obj = tasks.find((x) => x.id === props.tasks[e.target.name].id);
    obj.completed = true;

    const arr = tasks.filter((x) => x.id !== props.tasks[e.target.name].id);
    setTasks([obj, ...arr]);
    props.frame(); // check color of frame
  };

  //show all todos/posts
  const cancel = (e) => {
    if (e.target.id === "todo") {
      setTodo(true);
    } else {
      setPost(true);
    }
  };

  //add todo/post to all todos/posts
  const add = (e) => {
    if (e.target.id === "todo") {
      if (newTask !== "") {
        //if task not empty
        let obj = {
          userId: props.id,
          id: tasks.length + 1,
          title: newTask,
          completed: false,
        };

        props.setTodos(obj); // add this todo to all todos
        setTodo(true); //show all todos
      } else {
        //if entered empty todo
        alert("You must enter a title!!");
      }
    } else {
      if (newTitle !== "" && newBody !== "") {
        //if post not empty
        let obj = {
          userId: props.id,
          id: props.posts.length + 1,
          title: newTitle,
          body: newBody,
        };

        props.setPosts(obj); // add this post to all posts
        setPost(true); //show all todos
      } else {
        //if entered post empty
        alert("You must enter a title and a body!!");
      }
    }
  };

  return (
    <div
      id={props.id + 300}
      style={{
        height: "3in",
        overflowY: "scroll",
        float: "right",
        width: "49%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        visibility: "hidden",
      }}
    >
      {showTodo === true ? ( //check if clicked add todo
        <div className="box">
          <button className="right" onClick={() => setTodo(false)}>
            Add
          </button>
          <h3>Todos - User {props.id}</h3>

          {props.tasks.map((task, index) => {
            //all todos
            return (
              <div
                key={index}
                className="box"
                style={{
                  borderColor: "purple",
                  minHeight: "45px",
                  marginBottom: "10px",
                }}
              >
                <b>Title:</b> {task.title} <br /> <b>Completed:</b>{" "}
                {task.completed.toString()}
                {task.completed === false ? (
                  <button
                    name={index}
                    onClick={mark}
                    style={{ marginLeft: "5px" }}
                  >
                    Mark Completed
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>New Todo - User {props.id}</h3>
          <div
            className="box"
            style={{ height: "50px", display: "flex", flexDirection: "column" }}
          >
            <input
              placeholder="Title"
              style={{ width: "40%", marginTop: "5px" }}
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                gap: "4px",
                paddingRight: "3px",
                justifyContent: "end",
              }}
            >
              <button id="todo" onClick={cancel}>
                Cancel
              </button>
              <button id="todo" onClick={add}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {showPost === true ? ( //check if clicked add post
        <div className="box">
          <button className="right" onClick={() => setPost(false)}>
            Add
          </button>
          <h3>Posts - User {props.id}</h3>

          {props.posts.map((post, index) => {
            //all posts
            return (
              <div
                key={index}
                className="box"
                style={{ borderColor: "purple", marginBottom: "10px" }}
              >
                <b>Title:</b> {post.title}
                <br />
                <b>Body:</b> {post.body}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>New Post - User {props.id}</h3>
          <div
            className="box"
            style={{
              height: "93px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <input
              placeholder="Title"
              style={{ width: "40%", marginTop: "5px" }}
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              placeholder="Body"
              style={{ width: "40%" }}
              type="text"
              onChange={(e) => setNewBody(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                gap: "4px",
                paddingRight: "3px",
                justifyContent: "end",
              }}
            >
              <button id="post" onClick={cancel}>
                Cancel
              </button>
              <button id="post" onClick={add}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
