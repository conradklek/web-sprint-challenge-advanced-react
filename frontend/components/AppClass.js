import React from "react";
import Axios from "axios";

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      active: [2, 2],
      message: "",
      count: 0,
    };
  }

  setActive(grid) {
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
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.active[0]}, {this.state.active[1]})
          </h3>
          <h3 id="steps">You moved {this.state.count} times</h3>
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button
            id="left"
            onClick={() => {
              this.setState({
                message: "",
              });
              this.state.active[1] > 1
                ? this.setState({
                    count: this.state.count + 1,
                  })
                : this.setState({
                    message: "You can't go left",
                  });
              this.state.active[1] =
                this.state.active[1] > 1
                  ? this.state.active[1] - 1
                  : this.state.active[1];
              this.setActive(this.state.active);
            }}
          >
            LEFT
          </button>
          <button
            id="up"
            onClick={() => {
              this.setState({
                message: "",
              });
              this.state.active[0] > 1
                ? this.setState({
                    count: this.state.count + 1,
                  })
                : this.setState({
                    message: "You can't go up",
                  });
              this.state.active[0] =
                this.state.active[0] > 1
                  ? this.state.active[0] - 1
                  : this.state.active[0];
              this.setActive(this.state.active);
            }}
          >
            UP
          </button>
          <button
            id="right"
            onClick={() => {
              this.setState({
                message: "",
              });
              this.state.active[1] < 3
                ? this.setState({
                    count: this.state.count + 1,
                  })
                : this.setState({
                    message: "You can't go right",
                  });
              this.state.active[1] =
                this.state.active[1] < 3
                  ? this.state.active[1] + 1
                  : this.state.active[1];
              this.setActive(this.state.active);
            }}
          >
            RIGHT
          </button>
          <button
            id="down"
            onClick={() => {
              this.setState({
                message: "",
              });
              this.state.active[0] < 3
                ? this.setState({
                    count: this.state.count + 1,
                  })
                : this.setState({
                    message: "You can't go down",
                  });
              this.state.active[0] =
                this.state.active[0] < 3
                  ? this.state.active[0] + 1
                  : this.state.active[0];
              this.setActive(this.state.active);
            }}
          >
            DOWN
          </button>
          <button
            id="reset"
            onClick={() => {
              this.setState({
                active: [2, 2],
                message: "",
                count: 0,
              });
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
            const x = this.state.active[0];
            const y = this.state.active[1];
            const steps = this.state.count;
            const url = "http://localhost:9000/api/result";
            Axios.post(url, { email, x, y, steps }).then((res) => {
              this.setState({
                message: res.data.message,
              });
            });
          }}
        >
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
