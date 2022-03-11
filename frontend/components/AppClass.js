import React from "react";
import Axios from "axios";

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: 0,
      message: "",
      grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
      x: 2,
      y: 2,
      email: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email.length) {
      this.setState({ message: "Ouch: email is required" });
    } else if (email === "foo@bar.baz") {
      return setMessage("foo@bar.baz failure #71");
    } else {
      const url = "http://localhost:9000/api/result";
      Axios.post(url, {
        email: this.state.email,
        x: this.state.x,
        y: this.state.y,
        steps: this.state.steps,
      })
        .then((res) => {
          this.setState({
            message: res.data.message,
            email: "",
            grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
            steps: 0,
          });
          document.getElementById("email").value = "";
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            message: err.message,
            email: "",
            grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
            steps: 0,
          });
        });
    }
  };
  getCoordinates = () => {
    let grid = this.state.grid;
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
  };
  getPos = () => {
    let pos = 0;
    for (let i = 0; i < this.state.grid.length; i++) {
      if (this.state.grid[i] === "B") pos = i;
    }
    this.setState({ message: "", steps: this.state.steps + 1 });
    return pos;
  };
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.x}, {this.state.y})
          </h3>
          <h3 id="steps">
            You moved {this.state.steps} time
            {`${this.state.steps === 1 ? "" : "s"}`}
          </h3>
        </div>
        <div id="grid">
          {this.state.grid.map((square, i) => (
            <div key={i} className={`square ${square === "B" ? "active" : ""}`}>
              {`${square === "B" ? "B" : ""}`}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button
            id="left"
            onClick={() => {
              if (this.state.x === 1) {
                this.setState({ message: "You can't go left" });
              } else {
                let pos = this.getPos();
                let newGrid = [...this.state.grid];
                newGrid[pos] = this.state.grid[pos - 1];
                newGrid[pos - 1] = "B";
                this.setState({ grid: newGrid, x: this.state.x - 1 });
              }
            }}
          >
            LEFT
          </button>
          <button
            id="up"
            onClick={() => {
              if (this.state.y === 1) {
                this.setState({ message: "You can't go up" });
              } else {
                let pos = this.getPos();
                let newGrid = [...this.state.grid];
                newGrid[pos] = this.state.grid[pos - 3];
                newGrid[pos - 3] = "B";
                this.setState({ grid: newGrid, y: this.state.y - 1 });
              }
            }}
          >
            UP
          </button>
          <button
            id="right"
            onClick={() => {
              if (this.state.x === 3) {
                this.setState({ message: "You can't go right" });
              } else {
                let pos = this.getPos();
                let newGrid = [...this.state.grid];
                newGrid[pos] = this.state.grid[pos + 1];
                newGrid[pos + 1] = "B";
                this.setState({ grid: newGrid, x: this.state.x + 1 });
              }
            }}
          >
            RIGHT
          </button>
          <button
            id="down"
            onClick={() => {
              if (this.state.y === 3) {
                this.setState({ message: "You can't go down" });
              } else {
                let pos = this.getPos();
                let newGrid = [...this.state.grid];
                newGrid[pos] = this.state.grid[pos + 3];
                newGrid[pos + 3] = "B";
                this.setState({ grid: newGrid, y: this.state.y + 1 });
              }
            }}
          >
            DOWN
          </button>
          <button
            id="reset"
            onClick={() => {
              this.setState({
                grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
                steps: 0,
                message: "",
                x: 2,
                y: 2,
              });
            }}
          >
            reset
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
