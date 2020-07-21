class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
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
        return (
            <div>
                <h1>It is {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}