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
    props.callback1(); // check color of frame
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

        props.callback2(obj); // add this todo to all todos
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

        props.callback3(obj); // add this post to all posts
        setPost(true); //show all todos
      } else {
        //if entered post empty
        alert("You must enter a title and a body!!");
      }
    }
  };

  return (
    <div
      style={{
        height: "2.5in",
        overflowY: "scroll",
        float: "right",
        width: "49%",
      }}
    >
      {showTodo === true ? ( //check if clicked add todo
        <div className="box">
          <button className="right" onClick={() => setTodo(false)}>
            Add
          </button>

          <h3> Todos - User {props.id}</h3>

          {props.tasks.map((x, index) => {
            //all todos
            return (
              <div key={index}>
                <div
                  className="box"
                  style={{ borderColor: "purple", minHeight: "45px" }}
                >
                  <b>Title:</b> {x.title} <br /> <b>Completed:</b>{" "}
                  {x.completed.toString()} &nbsp;&nbsp;
                  {x.completed === false ? ( //check if task complete
                    <button name={index} onClick={mark}>
                      Mark Completed
                    </button>
                  ) : null}
                </div>
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3> New Todo - User {props.id}</h3>

          <div className="box" style={{ height: "50px" }}>
            &nbsp;
            <input
              placeholder="Title"
              style={{ width: "40%" }}
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <br />
            <div className="right">
              <button id="todo" onClick={cancel}>
                Cancel
              </button>
              &nbsp;&nbsp;
              <button id="todo" onClick={add}>
                Add
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      )}{" "}
      <br />
      {showPost === true ? ( //check if clicked add post
        <div className="box">
          <button className="right" onClick={() => setPost(false)}>
            Add
          </button>

          <h3> Posts - User {props.id}</h3>

          {props.posts.map((x, index) => {
            //all posts
            return (
              <div key={index}>
                <div className="box" style={{ borderColor: "purple" }}>
                  <b>Title:</b> {x.title} <br /> <br />
                  <b>Body:</b> {x.body} <br />
                </div>
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3> New Post - User {props.id}</h3>

          <div className="box" style={{ height: "93px" }}>
            &nbsp;
            <input
              placeholder="Title"
              style={{ width: "40%" }}
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <br />
            <br />
            &nbsp;
            <input
              placeholder="Body"
              style={{ width: "40%" }}
              type="text"
              onChange={(e) => setNewBody(e.target.value)}
            />
            <br />
            <div className="right">
              <button id="post" onClick={cancel}>
                Cancel
              </button>
              &nbsp;&nbsp;{/* 2 spaces */}
              <button id="post" onClick={add}>
                Add
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
