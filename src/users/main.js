import { useState, useEffect, useRef } from "react";
import TasksComp from "./tasks";

export default function Main(props) {
  const boxRef = useRef(null);
  const addressRef = useRef(null);
  const tasksRef = useRef(null);
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
    setHeight(boxRef.current.offsetHeight);
  }, []);

  //set details every time user change
  useEffect(() => {
    const obj = {
      id: props.user.id,
      name: props.user.name,
      email: props.user.email,
      ...(props.user.address
        ? { address: props.user.address }
        : { address: { street: "", city: "", zipcode: "" } }),
    };

    setDetails(obj);
    frameColor();
  }, [props]);

  //close box of other data
  const showHide = () => {
    addressRef.current.style.visibility =
      addressRef.current.style.visibility === "hidden" ? "visible" : "hidden";
  };

  //callback for parent comp to update user
  const update = () => {
    if (
      details.name === "" ||
      details.email === "" ||
      details.address.city === "" ||
      details.address.street === "" ||
      details.address.zipcode === ""
    ) {
      alert("You must fill all the form!");
    } else if (!details.email.includes("@")) {
      alert("You must enter a validate email!");
    } else {
      props.update(details);
    }
  };

  //change color of user box if clicked
  const color = () => {
    if (tasksRef.current.style.visibility === "hidden") {
      boxRef.current.style.backgroundColor = "#ffd9b3";
      tasksRef.current.style.visibility = "visible";
    } else {
      boxRef.current.style.backgroundColor = "";
      tasksRef.current.style.visibility = "hidden";
    }
  };

  // check color of frame if mark completed
  const frameColor = () => {
    const color = props.todos.find((task) => !task.completed);
    setFrame(color ? "red" : "green");
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
      <div className="box" style={{ borderColor: frame }} ref={boxRef}>
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
          ref={addressRef}
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
        tasksRef={tasksRef}
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
