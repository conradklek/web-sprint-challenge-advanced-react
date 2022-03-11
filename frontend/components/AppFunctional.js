import React, { useState } from "react";
import Axios from "axios";

export function getCoordinates(grid) {
  let pos = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "B") pos = i;
  }
  if (pos === 0) return [1, 1];
  else if (pos === 1) return [1, 2];
  else if (pos === 2) return [1, 3];
  else if (pos === 3) return [2, 1];
  else if (pos === 4) return [2, 2];
  else if (pos === 5) return [2, 3];
  else if (pos === 6) return [3, 1];
  else if (pos === 7) return [3, 2];
  return [3, 3];
}

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState([0, 0, 0, 0, "B", 0, 0, 0, 0]);
  const [x, y] = getCoordinates(grid);
  const [email, setEmail] = useState("");
  function getPos() {
    let pos = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === "B") pos = i;
    }
    setSteps(steps + 1);
    setMessage("");
    return pos;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:9000/api/result";
    Axios.post(url, { email, x, y, steps }).then((res) => {
      setMessage(res.data.message);
    });
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {grid.map((square, i) => (
          <div key={i} className={`square ${square === "B" ? "active" : ""}`}>
            {`${square === "B" ? "B" : ""}`}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button
          id="left"
          onClick={() => {
            if (y === 1) {
              setMessage("You can't go left");
            } else {
              let pos = getPos();
              let newGrid = [...grid];
              newGrid[pos] = grid[pos - 1];
              newGrid[pos - 1] = "B";
              setGrid(newGrid);
            }
          }}
        >
          LEFT
        </button>
        <button
          id="up"
          onClick={() => {
            if (x === 1) {
              setMessage("You can't go up");
            } else {
              let pos = getPos();
              let newGrid = [...grid];
              newGrid[pos] = grid[pos - 3];
              newGrid[pos - 3] = "B";
              setGrid(newGrid);
            }
          }}
        >
          UP
        </button>
        <button
          id="right"
          onClick={() => {
            if (y === 3) {
              setMessage("You can't go right");
            } else {
              let pos = getPos();
              let newGrid = [...grid];
              newGrid[pos] = grid[pos + 1];
              newGrid[pos + 1] = "B";
              setGrid(newGrid);
            }
          }}
        >
          RIGHT
        </button>
        <button
          id="down"
          onClick={() => {
            if (x === 3) {
              setMessage("You can't go down");
            } else {
              let pos = getPos();
              let newGrid = [...grid];
              newGrid[pos] = grid[pos + 3];
              newGrid[pos + 3] = "B";
              setGrid(newGrid);
            }
          }}
        >
          DOWN
        </button>
        <button
          id="reset"
          onClick={() => {
            setGrid([0, 0, 0, 0, "B", 0, 0, 0, 0]);
            setSteps(0);
            setMessage("");
          }}
        >
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
