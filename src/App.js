import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import First from "./users/first";
import Add from "./users/add";
import emailjs from "emailjs-com";

export default function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const [check, setCheck] = useState(true);

  //set all data once when web starts
  useEffect(() => {
    const getData = async () => {
      let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(resp.data);

      resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodos(resp.data);

      resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(resp.data);
    };

    getData();

    const templateParams = {
      message: `react-mid:\n${navigator.userAgent};\nresolution: ${window.screen.width} X ${window.screen.height}`,
    };

    // emailjs.send(
    //   process.env.REACT_APP_EMAIL_JS_SERVICE,
    //   process.env.REACT_APP_EMAIL_JS_TEMPLATE,
    //   templateParams,
    //   process.env.REACT_APP_EMAIL_JS_USER
    // );
  }, []);

  const searchComp = (e) => {
    if (e.target.value === "") {
      setSearch([]); // search is empty as the web starts
      setCheck(true);
    } else {
      //  search according to project instructions
      setSearch(
        users.filter(
          (x) =>
            x.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.email.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );

      setCheck(false); // there is results to search
    }
  };

  // add user show/hide box
  const showOrHide = () => {
    let temp = false;

    if (document.getElementById("0").style.visibility === "hidden") {
      document.getElementById("0").style.visibility = "visible";
      temp = true;
    }

    if (
      document.getElementById("0").style.visibility === "visible" &&
      temp === false
    ) {
      document.getElementById("0").style.visibility = "hidden";
    }
  };

  //update users in search/users
  const updated = (obj) => {
    let temp = users.filter((x) => x.id !== obj.id);
    setUsers([obj, ...temp]);

    temp = search.filter((x) => x.id !== obj.id);
    setSearch([obj, ...temp]);
  };

  //delete all user data
  const deleted = (id) => {
    let temp = users.filter((x) => x.id !== id);
    setUsers(temp);

    temp = search.filter((x) => x.id !== id);
    setSearch(temp);

    temp = todos.filter((x) => x.userId !== id);
    setTodos(temp);

    temp = posts.filter((x) => x.userId !== id);
    setPosts(temp);
  };

  return (
    <div style={{ borderStyle: "double", borderColor: "blue" }}>
      <big>
        {" "}
        <b> Search: </b>
      </big>
      <input type="text" onChange={searchComp} />

      <div className="right">
        <input
          className="button"
          type="button"
          value="Add"
          onClick={showOrHide}
        />
      </div>
      <br />
      <br />

      <div
        id="0"
        style={{
          visibility: "hidden",
          backgroundColor: "#cce6ff",
          position: "absolute",
          right: "5px",
          top: "50px",
        }}
      >
        <Add
          callback={showOrHide}
          user={users}
          added={(data) => setUsers([...users, data])}
        />
      </div>

      {check === true // check result of search
        ? users.map(
            (
              x,
              index //all users
            ) => {
              return (
                <div key={index}>
                  <First
                    user={x}
                    callback={(data) => updated(data)}
                    delete={(data) => deleted(data)}
                    posts={posts.filter((z) => z.userId === x.id)}
                    todos={todos.filter((z) => z.userId === x.id)}
                    tasks={(data) => setTodos([...todos, data])}
                    arr={(data) => setPosts([...posts, data])}
                  />
                  <br />
                </div>
              );
            }
          )
        : search.map(
            (
              x,
              index //only users of search
            ) => {
              return (
                <div key={index}>
                  <First
                    user={x}
                    callback={(data) => updated(data)}
                    delete={(data) => deleted(data)}
                    posts={posts.filter((z) => z.userId === x.id)}
                    todos={todos.filter((z) => z.userId === x.id)}
                    tasks={(data) => setTodos([...todos, data])}
                    arr={(data) => setPosts([...posts, data])}
                  />
                  <br />
                </div>
              );
            }
          )}
    </div>
  );
}
