import React, { useState } from "react";
import Axios from "axios";

export function setActive(grid) {
  const cur = document.querySelector("#grid .active");
  cur.classList.remove("active");
  cur.innerText = "";
  switch (grid.join("")) {
    case "11":
      document
        .querySelector("#grid .square:nth-of-type(1)")
        .classList.add("active");
      break;
    case "12":
      document
        .querySelector("#grid .square:nth-of-type(2)")
        .classList.add("active");
      break;
    case "13":
      document
        .querySelector("#grid .square:nth-of-type(3)")
        .classList.add("active");
      break;
    case "21":
      document
        .querySelector("#grid .square:nth-of-type(4)")
        .classList.add("active");
      break;
    case "22":
      document
        .querySelector("#grid .square:nth-of-type(5)")
        .classList.add("active");
      break;
    case "23":
      document
        .querySelector("#grid .square:nth-of-type(6)")
        .classList.add("active");
      break;
    case "31":
      document
        .querySelector("#grid .square:nth-of-type(7)")
        .classList.add("active");
      break;
    case "32":
      document
        .querySelector("#grid .square:nth-of-type(8)")
        .classList.add("active");
      break;
    case "33":
      document
        .querySelector("#grid .square:nth-of-type(9)")
        .classList.add("active");
      break;
    default:
      break;
  }
  document.querySelector("#grid .active").innerText = "B";
}

export default function AppFunctional(props) {
  const [count, setCount] = useState(0);
  const [grid, setGrid] = useState([2, 2]);
  const [warn, setWarn] = useState("");
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({grid[0]}, {grid[1]})
        </h3>
        <h3 id="steps">You moved {count} times</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message">{warn}</h3>
      </div>
      <div id="keypad">
        <button
          id="left"
          onClick={() => {
            setWarn("");
            grid[1] > 1 ? setCount(count + 1) : setWarn("You can't go left");
            grid[1] = grid[1] > 1 ? grid[1] - 1 : grid[1];
            setActive(grid);
          }}
        >
          LEFT
        </button>
        <button
          id="up"
          onClick={() => {
            setWarn("");
            grid[0] > 1 ? setCount(count + 1) : setWarn("You can't go up");
            grid[0] = grid[0] > 1 ? grid[0] - 1 : grid[0];
            setActive(grid);
          }}
        >
          UP
        </button>
        <button
          id="right"
          onClick={() => {
            setWarn("");
            grid[1] < 3 ? setCount(count + 1) : setWarn("You can't go right");
            grid[1] = grid[1] < 3 ? grid[1] + 1 : grid[1];
            setActive(grid);
          }}
        >
          RIGHT
        </button>
        <button
          id="down"
          onClick={() => {
            setWarn("");
            grid[0] < 3 ? setCount(count + 1) : setWarn("You can't go down");
            grid[0] = grid[0] < 3 ? grid[0] + 1 : grid[0];
            setActive(grid);
          }}
        >
          DOWN
        </button>
        <button
          id="reset"
          onClick={() => {
            setCount(0);
            setGrid([2, 2]);
            setWarn("");
            document.querySelector("#grid .square.active").innerText = "";
            document
              .querySelector("#grid .square.active")
              .classList.remove("active");
            document
              .querySelector("#grid .square:nth-of-type(5)")
              .classList.add("active");
            document.querySelector("#grid .square:nth-of-type(5)").innerText =
              "B";
          }}
        >
          reset
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = document.querySelector("#email").value;
          const x = grid[0];
          const y = grid[1];
          const steps = count;
          const url = "http://localhost:9000/api/result";
          Axios.post(url, { email, x, y, steps }).then((res) => {
            setWarn(res.data.message);
          });
        }}
      >
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
