/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // this.timerID = setInterval(
    //     () => this.tick(),
    //     1000
    // );
    // requestAnimationFrame(() => this.tick());
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <h1>
          {`It is ${date.toLocaleTimeString()}`}
        </h1>
      </div>
    );
  }
}
