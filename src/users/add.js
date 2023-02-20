import { useState } from "react";
import "../App.css";

export default function Add(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // add user
  const add = () => {
    if (email === "" || name === "") {
      // check if entered user empty
      alert("You must enter name and email to add user!");
    } else {
      if (email.includes("@")) {
        // check if entered email valid
        let obj;
        let id = props.users.map((x) => x.id);

        if (id.length !== 0) {
          // check if new user not the first user in system
          id = Math.max(...id); // get last user id
          obj = { id: id + 1, name: name, email: email };
        } else {
          // if new user the first user in system
          obj = { id: 1, name: name, email: email };
        }

        props.setUsers(obj); //add user to data
        document.getElementById("name").value = ""; // clear name
        document.getElementById("email").value = ""; // clear email
        props.showOrHide(); // hide addUser box
      } else {
        // if entered email that isn't valid
        alert("You must enter a validate email!");
      }
    }
  };

  // hide addUser box
  const cancel = () => {
    document.getElementById("name").value = ""; // clear name
    document.getElementById("email").value = ""; // clear email
    props.showOrHide();
  };

  return (
    <div className="box" style={{ width: "15rem", height: "75px" }}>
      <input
        placeholder="Enter Name"
        type="text"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter Email"
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "4px",
          paddingRight: "3px",
          paddingTop: "5px",
        }}
      >
        <button onClick={cancel}>Cancel</button>
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
