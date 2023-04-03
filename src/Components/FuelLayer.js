import React, { Component } from "react"
import Fuel from "./Fuel";

export default class FuelLayer extends Component {

    constructor(props) {
        super(props);
        this.board = props.board;
        this.state = {
            fuel: []
        }
        this.fuelSpotCounter = null;

        this.fuelLayer = React.createRef();
    }

    distributeFuel = () => {
        this.fuelSpotCounter = setInterval(()=> {
            let fuelX = Math.floor(Math.random() *  
                (this.fuelLayer.current.getBoundingClientRect().right - this.fuelLayer.current.getBoundingClientRect().left)) + "px";
            let fuelY = Math.floor(Math.random() * 
                (this.fuelLayer.current.getBoundingClientRect().bottom -  this.fuelLayer.current.getBoundingClientRect().top)) + "px";
            let newFuel = [...this.state.fuel,
                {
                    left: fuelX,
                    top: fuelY
                }
            ];
            this.setState({
                fuel: newFuel
            });
    }, 2000)
        
    }

    stop = () => {
        clearInterval(this.fuelSpotCounter);
    }

    render() {
        return <div ref={this.fuelLayer} className="fuel-layer">
            {this.state.fuel.map((item, index) => 
                <Fuel 
                    style = {this.state.fuel[index]} 
                    key = {index}
                />
            )}
        </div>
    }

}