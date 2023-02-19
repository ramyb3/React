import { useState } from "react";
import "../App.css";

export default function Add(props) {
  const [names, setNames] = useState("");
  const [emails, setEmails] = useState("");

  // add user
  const add = () => {
    if (emails === "" || names === "") {
      // check if entered user empty
      alert("You must enter name and email to add user!");
    } else {
      if (emails.includes("@")) {
        // check if entered email valid
        let obj;
        let id = props.user.map((x) => x.id);

        if (id.length !== 0) {
          // check if new user not the first user in system
          id = Math.max(...id); // get last user id
          obj = { id: id + 1, name: names, email: emails };
        } // if new user the first user in system
        else {
          obj = { id: 1, name: names, email: emails };
        }

        props.added(obj); //add user to data

        document.getElementById("name").value = ""; // clear name
        document.getElementById("email").value = ""; // clear email

        props.callback(); // hide addUser box
      } // if entered email that isn't valid
      else {
        alert("You must enter a validate email!");
      }
    }
  };

  // hide addUser box
  const cancel = () => {
    document.getElementById("name").value = ""; // clear name
    document.getElementById("email").value = ""; // clear email

    props.callback();
  };

  return (
    <div className="box" style={{ width: "15rem", height: "75px" }}>
      &nbsp;
      <input
        placeholder="Enter Name"
        type="text"
        id="name"
        onChange={(e) => setNames(e.target.value)}
      />{" "}
      <br />
      &nbsp;
      <input
        placeholder="Enter Email"
        type="email"
        id="email"
        onChange={(e) => setEmails(e.target.value)}
      />{" "}
      <br />
      <div className="right">
        <input
          className="button"
          type="button"
          value="Cancel"
          onClick={cancel}
        />
        &nbsp;&nbsp;{/* 2 spaces */}
        <input className="button" type="button" value="Add" onClick={add} />
        &nbsp;
      </div>
    </div>
  );
}
