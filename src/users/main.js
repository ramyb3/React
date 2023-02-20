import { useState, useEffect, useRef } from "react";
import TasksComp from "./tasks";
import "../App.css";

export default function Main(props) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [frame, setFrame] = useState();
  const [details, setDetails] = useState({
    id: 0,
    name: "",
    email: "",
    address: { street: "", city: "", zipcode: "" },
  });

  //set height of the layout when the app starts
  useEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);

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
      setFrame("red");
    } else {
      setFrame("green");
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
  const frameColor = () => {
    const color = props.todos.find((x) => x.completed === false);

    if (color !== undefined) {
      setFrame("red");
    } else {
      setFrame("green");
    }
  };

  return (
    <div
      style={{
        paddingBottom: "20px",
        paddingLeft: "2px",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "5px",
      }}
    >
      <div
        id={props.user.id + 100}
        className="box"
        style={{ borderColor: frame }}
        ref={ref}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={color}>
            ID: {props.user.id}
          </div>
          Name:
          <Input
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          Email:
          <Input
            value={details.email}
            type="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            paddingRight: "3px",
            paddingTop: "10px",
          }}
        >
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
            gap: "5px",
            paddingBottom: "5px",
          }}
        >
          <span>
            Street:{" "}
            <Input
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
            <Input
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
            <Input
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
      <TasksComp
        tasks={props.todos}
        posts={props.posts}
        id={props.user.id}
        frame={frameColor}
        setTodos={(data) => props.setTodos(data)}
        setPosts={(data) => props.setPosts(data)}
        height={height}
      />
    </div>
  );
}

function Input(props) {
  return (
    <input
      style={{ width: "150px" }}
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
