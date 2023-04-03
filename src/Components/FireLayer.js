import React, { Component } from "react"
import Fire from "./Fire";

export default class FireLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fire: []
        }
        this.fireSpotCounter = null;

        this.fireLayer = React.createRef();
    }

    setEverythingOnFire = () => {
        this.fireSpotCounter = setInterval(()=> {
            let fireX = Math.floor(Math.random() *  
                (this.fireLayer.current.getBoundingClientRect().right - this.fireLayer.current.getBoundingClientRect().left)) + "px";
            let fireY = Math.floor(Math.random() * 
                (this.fireLayer.current.getBoundingClientRect().bottom -  this.fireLayer.current.getBoundingClientRect().top)) + "px";
            let newFire = [...this.state.fire,
                {
                    left: fireX,
                    top: fireY
                }
            ];
            this.setState({
                fire: newFire
            });
    }, 2500)
        
    }

    stop = () => {
        clearInterval(this.fireSpotCounter);
    }


    render() {
        return <div ref={this.fireLayer} className="fire-layer">
            {this.state.fire.map((item, index) => 
                <Fire
                    style = {this.state.fire[index]} 
                    key = {index}
                />
            )}
        </div>
    }

}