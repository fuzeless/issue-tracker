/* eslint-disable react/react-in-jsx-scope */
export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
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
    this.setState({
      date: new Date()
    });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    const {
      date
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, `It is ${date.toLocaleTimeString()}`));
  }

}