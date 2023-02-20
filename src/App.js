import { useState, useEffect } from "react";
import axios from "axios";
import Main from "./users/main";
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

    emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE,
      templateParams,
      process.env.REACT_APP_EMAIL_JS_USER
    );
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
    let flag = false;

    if (
      document.getElementById("addUserButton").style.visibility === "hidden"
    ) {
      document.getElementById("addUserButton").style.visibility = "visible";
      flag = true;
    }
    if (
      document.getElementById("addUserButton").style.visibility === "visible" &&
      flag === false
    ) {
      document.getElementById("addUserButton").style.visibility = "hidden";
    }
  };

  //update users in search/users
  const updated = (obj) => {
    let arr = users.filter((x) => x.id !== obj.id);
    setUsers([obj, ...arr]);

    arr = search.filter((x) => x.id !== obj.id);
    setSearch([obj, ...arr]);
  };

  //delete all user data
  const deleted = (id) => {
    let arr = users.filter((x) => x.id !== id);
    setUsers(arr);

    arr = search.filter((x) => x.id !== id);
    setSearch(arr);

    arr = todos.filter((x) => x.userId !== id);
    setTodos(arr);

    arr = posts.filter((x) => x.userId !== id);
    setPosts(arr);
  };

  return (
    <div style={{ borderStyle: "double", borderColor: "blue" }}>
      <div
        style={{
          paddingBottom: "15px",
          paddingRight: "3px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "2px" }}
        >
          Search:
          <input
            type="text"
            style={{ marginLeft: "5px" }}
            onChange={searchComp}
          />
        </div>
        <button onClick={showOrHide}>Add</button>
      </div>
      <div
        id="addUserButton"
        style={{
          visibility: "hidden",
          backgroundColor: "#cce6ff",
          position: "absolute",
          right: "5px",
        }}
      >
        <Add
          users={users}
          showOrHide={showOrHide}
          setUsers={(data) => setUsers([...users, data])}
        />
      </div>

      {check === true // check result of search
        ? users.map((user, index) => {
            //all users
            return (
              <Main
                key={index}
                user={user}
                posts={posts.filter((x) => x.userId === user.id)}
                todos={todos.filter((x) => x.userId === user.id)}
                update={(data) => updated(data)}
                delete={(data) => deleted(data)}
                setTodos={(data) => setTodos([...todos, data])}
                setPosts={(data) => setPosts([...posts, data])}
              />
            );
          })
        : search.map((user, index) => {
            //only users of search
            return (
              <Main
                key={index}
                user={user}
                posts={posts.filter((x) => x.userId === user.id)}
                todos={todos.filter((x) => x.userId === user.id)}
                update={(data) => updated(data)}
                delete={(data) => deleted(data)}
                setTodos={(data) => setTodos([...todos, data])}
                setPosts={(data) => setPosts([...posts, data])}
              />
            );
          })}
    </div>
  );
}
