// import "./Bike.css"
import React, { Component } from "react"

export default class FuelCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fuel: 100
        }
    }


    render() {
        return <span className="fuel-counter">{this.state.fuel}</span>
    }
}