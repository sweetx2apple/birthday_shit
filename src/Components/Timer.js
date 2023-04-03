import React, { Component } from "react";

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false
        }
    }

    componentDidUpdate() {
        if (this.state.isOn !== this.props.isOn) {
            this.setState({
                isOn: this.props.isOn
            });
        }

    }

    ticTac = () => {
        this.counter = setInterval(()=> {
            let newTime = this.state.time + 1;
            this.setState({
            time: newTime
        })}, 1000)
    }

    stop = () => {
        clearInterval(this.counter)
    }

    render() {
        return <span className="timer">{this.state.time}</span>
    }
}