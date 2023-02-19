import { useState, useEffect } from "react";
import TasksComp from "./tasks";
import "../App.css";

export default function First(props) {
  const [check, setCheck] = useState();
  const [details, setDetails] = useState({
    id: 0,
    name: "",
    email: "",
    address: { street: "", city: "", zipcode: "" },
  });

  //set details every time user change
  useEffect(() => {
    if (props.user.address) {
      // if user exist
      setDetails({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        address: {
          street: props.user.address.street,
          city: props.user.address.city,
          zipcode: props.user.address.zipcode,
        },
      });
    } else {
      // if new user
      setDetails({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        address: { street: "", city: "", zipcode: "" },
      });
    }

    // check color of frame in start
    const color = props.todos.find((x) => x.completed === false);

    if (color !== undefined) {
      setCheck("red");
    } else {
      setCheck("green");
    }
  }, [props]);

  //close box of other data
  const showHide = () => {
    let ok = true;

    if (document.getElementById(props.user.id).style.visibility === "hidden") {
      document.getElementById(props.user.id).style.visibility = "visible";
      ok = false;
    }
    if (ok === true) {
      document.getElementById(props.user.id).style.visibility = "hidden";
    }
  };

  //callback for parent comp to update user
  const update = () => {
    let ok = true;

    if (
      details.name === "" ||
      details.email === "" ||
      details.address.city === "" ||
      details.address.street === "" ||
      details.address.zipcode === ""
    ) {
      alert("You must fill all the form!");
      ok = false;
    }
    if (!details.email.includes("@")) {
      alert("You must enter a validate email!");
      ok = false;
    }
    if (ok === true) {
      props.update(details);
    }
  };

  //change color of user box if clicked
  const color = () => {
    let flag = true;

    if (
      document.getElementById(props.user.id + 300).style.visibility === "hidden"
    ) {
      document.getElementById(props.user.id + 100).style.backgroundColor =
        "#ffd9b3";
      document.getElementById(props.user.id + 300).style.visibility = "visible";

      flag = false;
    }
    if (
      document.getElementById(props.user.id + 300).style.visibility ===
        "visible" &&
      flag === true
    ) {
      document.getElementById(props.user.id + 100).style.backgroundColor = "";
      document.getElementById(props.user.id + 300).style.visibility = "hidden";
    }
  };

  // check color of frame if mark completed
  const frame = () => {
    const color = props.todos.find((x) => x.completed === false);

    if (color !== undefined) {
      setCheck("red");
    } else {
      setCheck("green");
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <TasksComp
        tasks={props.todos}
        posts={props.posts}
        id={props.user.id}
        frame={frame}
        setTodos={(data) => props.setTodos(data)}
        setPosts={(data) => props.setPosts(data)}
      />
      <div
        id={props.user.id + 100}
        className="box"
        style={{ borderColor: check, width: "49%" }}
      >
        <big>
          <b>
            <div style={{ cursor: "pointer" }} onClick={color}>
              ID: {props.user.id}
            </div>
            <br />
            Name:
            <br />
            <input
              style={{ width: "150px" }}
              type="text"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <br />
            Email:
            <br />
            <input
              style={{ width: "150px" }}
              type="email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <br />
            <br />
          </b>
        </big>
        <div style={{ display: "flex", gap: "4px", paddingRight: "3px" }}>
          <button
            style={{ backgroundColor: "grey", color: "whitesmoke" }}
            onClick={showHide}
          >
            Other Data
          </button>
          <button onClick={update}>Update</button>
          <button onClick={() => props.delete(props.user.id)}>Delete</button>
        </div>
        <div
          id={props.user.id}
          className="box"
          style={{
            visibility: "hidden",
            backgroundColor: "whitesmoke",
            marginBottom: "5px",
            marginTop: "5px",
            display: "flex",
            flexDirection: "column",
            gpa: "5px",
            paddingBottom: "5px",
          }}
        >
          <span>
            Street:{" "}
            <input
              style={{ width: "100px" }}
              type="text"
              value={details.address.street}
              onChange={(e) =>
                setDetails({
                  ...details,
                  address: { ...details.address, street: e.target.value },
                })
              }
            />
          </span>
          <span>
            City:{" "}
            <input
              style={{ width: "100px" }}
              type="text"
              value={details.address.city}
              onChange={(e) =>
                setDetails({
                  ...details,
                  address: { ...details.address, city: e.target.value },
                })
              }
            />
          </span>
          <span>
            Zipcode:{" "}
            <input
              style={{ width: "100px" }}
              type="text"
              value={details.address.zipcode}
              onChange={(e) =>
                setDetails({
                  ...details,
                  address: { ...details.address, zipcode: e.target.value },
                })
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
}
