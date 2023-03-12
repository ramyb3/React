import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Main from "./users/main";
import Add from "./users/add";
import emailjs from "emailjs-com";

export default function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const [check, setCheck] = useState(true);
  const ref = useRef(null);

  //set all data once when web starts
  useEffect(() => {
    const getData = async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/";

        let resp = await axios.get(`${url}users`);
        setUsers(resp.data);

        resp = await axios.get(`${url}todos`);
        setTodos(resp.data);

        resp = await axios.get(`${url}posts`);
        setPosts(resp.data);
      } catch (e) {
        console.log(e);
      }
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
          (user) =>
            user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            user.email.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );

      setCheck(false); // there is results to search
    }
  };

  // add user show/hide box
  const showOrHide = () => {
    ref.current.style.visibility =
      ref.current.style.visibility === "hidden" ? "visible" : "hidden";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  };

  //update users in search/users
  const updated = (obj) => {
    let arr = users.filter((user) => user.id !== obj.id);
    setUsers([obj, ...arr]);

    arr = search.filter((user) => user.id !== obj.id);
    setSearch([obj, ...arr]);
  };

  //delete all user data
  const deleted = (id) => {
    let arr = users.filter((user) => user.id !== id);
    setUsers(arr);

    arr = search.filter((user) => user.id !== id);
    setSearch(arr);

    arr = todos.filter((task) => task.userId !== id);
    setTodos(arr);

    arr = posts.filter((post) => post.userId !== id);
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
        ref={ref}
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

      {(check ? users : search).map((user, index) => {
        return (
          <Main
            key={index}
            user={user}
            posts={posts.filter((data) => data.userId === user.id)}
            todos={todos.filter((data) => data.userId === user.id)}
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
