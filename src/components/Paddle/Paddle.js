import React from "react";
import "./Paddle.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Paddle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const test = (
      <div
        className="paddle pic"
        style={{
          top: `${this.props.movement.y}px`,
          transform: `rotate(${this.props.movement.r}deg)`
        }}
      >
        <img
          className="wood"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJF2XAegilavKuCg_o3s8ZTbgEdNOBcu7COJtl9JSX2f_Az2EB"
          alt="wood"
        />
      </div>
    );
    return (
      <ReactCSSTransitionGroup
        transitionName="pic"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {test}
      </ReactCSSTransitionGroup>
    );
  }
}

export default Paddle;
