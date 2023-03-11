import { useState } from "react";

export default function Add(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // add user
  const add = () => {
    if (email === "" || name === "") {
      alert("You must enter name and email to add user!");
    } else {
      if (email.includes("@")) {
        let obj;
        let id = props.users.map((user) => user.id);

        // if new user the first user in system
        obj = { id: 1, name, email };

        if (id.length > 0) {
          // check if new user not the first user in system
          id = Math.max(...id); // get last user id
          obj.id = id + 1;
        }

        props.setUsers(obj); //add user to data
        setEmail("");
        setName("");
        props.showOrHide(); // hide addUser box
      } else {
        alert("You must enter a validate email!");
      }
    }
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
        <button onClick={props.showOrHide}>Cancel</button>
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
