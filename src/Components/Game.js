import React, { Component } from "react";
import "./Game.css";
import Bike from "./Bike";
import FuelCounter from "./FuelCounter";
import Timer from "./Timer";
import FuelLayer from "./FuelLayer";
import FireLayer from "./FireLayer";

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameClass: props.gameClassState,
            isHidden: true,
            isOn: false
        };
        this.bike = React.createRef();
        this.board = React.createRef();
        this.fuelCounter = React.createRef();
        this.timer = React.createRef();
        this.fuelLayer = React.createRef();
        this.fireLayer = React.createRef();
        this.game = React.createRef();
        this.setGameClassName = props.setGameClassName;
        this.setContainerClass = props.setContainerClass;
    }

    componentDidUpdate () {
        if(this.state.gameClass !== this.props.gameClassState){
            if(this.state.gameClass === "covered"){
                this.setState({
                    gameClass: this.props.gameClassState,
                    isHidden: false,
                    isOn: true,
                });
                this.timer.current.ticTac();
                this.fuelLayer.current.distributeFuel();
                this.fireLayer.current.setEverythingOnFire();
            } else {
                this.setState({
                    gameClass: this.props.gameClassState,
                    isHidden: true,
                    isOn: false,
                });
            }
                

        }
           
    }


    render() {
    return (
        <div className={this.state.gameClass} ref={this.game}>
            <div className="board" id="board" ref={this.board}>
                <FuelLayer ref={this.fuelLayer} board = {this.board}/>
                <FireLayer ref={this.fireLayer} board = {this.board}/>
                <Bike 
                    ref={this.bike}
                    mainTimer = {this.timer}
                    fuelLayer = {this.fuelLayer}
                    fireLayer = {this.fireLayer}
                    fuelCounter = {this.fuelCounter}
                    board = {this.board}
                    isHidden = {this.state.isHidden}
                />
            </div>
            <div className="side-panel">     
                <FuelCounter ref={this.fuelCounter}/>
                <Timer ref={this.timer} isOn={this.state.isOn}/>
                    <span className="rules">    
                        Собирай топливо, объезжай огоньки. Рекорды пока по тайму ток. 
                        И да, это мега пред альфа вершн.
                        Багрепорты слать в ЛС :D
                    </span>
                    <button className="go-back-btn"
                        onClick={()=> {
                                this.timer.current.stop();
                                this.fuelLayer.current.stop();
                                this.fireLayer.current.stop();
                                this.timer.current.setState(
                                    {
                                        time: 0
                                    }
                                );
                                this.fuelLayer.current.setState(
                                    {
                                        fuel: []
                                    }
                                );
                                this.fireLayer.current.setState(
                                    {
                                        fire: []
                                    }
                                )
                                this.fuelCounter.current.setState(
                                    {
                                        fuel: 100
                                    }
                                );
                                this.setGameClassName("covered");
                                this.setContainerClass("container");
                            }
                        }
                    > на фиол</button>
                <ul className="record-list">
                    
                </ul>
            </div>
            <div className="game-over" id="game-over">
                <span>
                    Vitality K.O. 
                </span>
                <button className="return-button"
                        onClick={()=> {
                            document.getElementById("game-over").style.opacity = "0";
                            document.getElementById("game-over").style.zIndex = "0";
                            this.timer.current.setState(
                                {
                                    time: 0
                                }
                            );
                            this.fuelLayer.current.setState(
                                {
                                    fuel: []
                                }
                            );
                            this.fireLayer.current.setState(
                                {
                                    fire: []
                                }
                            )
                            this.fuelCounter.current.setState(
                                {
                                    fuel: 100
                                }
                            );
                            this.bike.current.gasTank = 100;

                            this.bike.current.setState(
                                {
                                    style:{
                                    left: 40 + "px",
                                    top: 20 + "px",
                                    }
                                }
                            )
                            this.timer.current.ticTac();
                            this.fuelLayer.current.distributeFuel();
                            this.fireLayer.current.setEverythingOnFire();
                        }}> 
                    start over?
                </button>
            </div>
        </div>
        )
    }
}