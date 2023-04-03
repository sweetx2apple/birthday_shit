import "./Bike.css"
import React, { Component } from "react"

export default class Bike extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style:{
                left: 40 + "px",
                top: 20 + "px",
            },
            isHidden: props.isHidden
        }
        this.bike = React.createRef();
        this.board = props.board;
        this.gasTank = 100;
        this.fuelCounter = props.fuelCounter;
        this.fuelLayer = props.fuelLayer;
        this.fireLayer = props.fireLayer;
        this.mainTimer = props.mainTimer;

    }

    componentDidUpdate(){
        if (this.state.isHidden !== this.props.isHidden){   
            this.bike.current.focus();
        }
    }



    moveRight = () => {
        let toLeft = +(this.state.style.left.slice(0, -2)) + 10;

        this.setState ({
            style: {
                left: toLeft + "px",
                top: this.state.style.top
                }   
        });
        this.gasTank -= 1;
        this.fuelCounter.current.setState({
            fuel: this.gasTank});
    }

    moveLeft = () => {
        let toLeft = +(this.state.style.left.slice(0, -2)) - 10;

        this.setState ({
            style: {
                left: toLeft + "px",
                top: this.state.style.top
                }   
        });
        this.gasTank -= 1; 
        this.fuelCounter.current.setState({
            fuel: this.gasTank});
    }

    moveDown = () => {
        let toTop = +(this.state.style.top.slice(0,-2)) + 10;

        this.setState ({
            style: {
                left: this.state.style.left,
                top: toTop + "px", 
                }   
        });
        this.gasTank -= 1;
        this.fuelCounter.current.setState({
            fuel: this.gasTank});
    }

    moveUp = () => {
        let toTop = +(this.state.style.top.slice(0,-2)) - 10;

        this.setState ({
           style: {
               left: this.state.style.left,
               top: toTop + "px", 
               }   
       });
       this.gasTank -= 1;
       this.fuelCounter.current.setState({
        fuel: this.gasTank});
   }

    isThereRefill = () => {

       

        let fuelCans = this.fuelLayer.current.state.fuel;


        const check = (item, index) => {
            let itemLeft = +item.left.slice(0, -2) + 5;
            let itemTop = +item.top.slice(0, -2) + 5;
            let bikeLeft = +this.bike.current.style.left.slice(0, -2) + 30;
            let bikeTop = +this.bike.current.style.top.slice(0, -2) + 22;

            let distance = Math.sqrt((bikeLeft - itemLeft)**2 + (bikeTop - itemTop)**2);

            if ( distance < 35 ) {
                console.log(this.fuelLayer.current.state.fuel);
                fuelCans.splice(index, 1);
                console.log(fuelCans);
                this.fuelLayer.current.setState({
                    fuel: fuelCans
                });
                console.log(this.fuelLayer.current.state.fuel);
                if (90 < this.gasTank && this.gasTank < 100 ) {
                    this.gasTank = 100;
                } else if (this.gasTank < 90) {
                    this.gasTank += 10;
                }

            }
            
        }

        fuelCans.map((item, index) => check(item, index));
        
    }

    isBadaBoom = () => {

       

        let torchlights = this.fireLayer.current.state.fire;


        const checkBoom = (item, index) => {
            let itemLeft = +item.left.slice(0, -2) + 5;
            let itemTop = +item.top.slice(0, -2) + 5;
            let bikeLeft = +this.bike.current.style.left.slice(0, -2) + 30;
            let bikeTop = +this.bike.current.style.top.slice(0, -2) + 22;

            let distance = Math.sqrt((bikeLeft - itemLeft)**2 + (bikeTop - itemTop)**2);

            if ( distance < 25 ) {
                this.gasTank = 0;
                this.fuelCounter.current.setState({
                    fuel: this.gasTank
                });
                this.gameOver();
            }
            
        }

        torchlights.forEach((item, index) => checkBoom(item, index));

        
    }

    gameOver = () => {
        this.mainTimer.current.stop();
        this.fuelLayer.current.stop();
        this.fireLayer.current.stop();
        let overTimeout = setTimeout(
            ()=> {
                document.getElementById("game-over").style.opacity = "1";
                document.getElementById("game-over").style.zIndex = "10";
                clearInterval(overTimeout);
            }, 2500
        )
        
    }

    keyDownHandler = (e) => {

        if (this.gasTank ===  0) {
            this.gameOver();
            return
        } 

        if(e.code === "KeyD" ) {
            let bikeRightBorder = this.bike.current.getBoundingClientRect().right;
            let boardRightBorder = this.board.current.getBoundingClientRect().right - 10;
            if ( boardRightBorder > bikeRightBorder && this.gasTank >  0 ) this.moveRight();
            this.isThereRefill();
            this.isBadaBoom();
        }

        if(e.code === "KeyA" ) {
            let bikeLefttBorder = this.bike.current.getBoundingClientRect().left;
            let boardLeftBorder = this.board.current.getBoundingClientRect().left + 5;
            if ( boardLeftBorder < bikeLefttBorder && this.gasTank >  0) this.moveLeft();
            this.isThereRefill();
            this.isBadaBoom();
        }

        if(e.code === "KeyS") {
            let bikeBottomBorder = this.bike.current.getBoundingClientRect().bottom;
            let boardBottomBorder = this.board.current.getBoundingClientRect().bottom - 5;
            if ( boardBottomBorder > bikeBottomBorder && this.gasTank >  0) this.moveDown();
            this.isThereRefill();
            this.isBadaBoom();
        }

        if(e.code === "KeyW") {
            let bikeTopBorder = this.bike.current.getBoundingClientRect().top;
            let boardTopBorder = this.board.current.getBoundingClientRect().top + 5;
            if ( boardTopBorder < bikeTopBorder && this.gasTank >  0) this.moveUp();
            this.isThereRefill();
            this.isBadaBoom();
        }

    }

    render() {
        return (
            <div
                ref={this.bike}
                id="bike" 
                tabIndex={"0"}
                style={this.state.style} 
                className="bike" 
                onKeyDown={this.keyDownHandler} 
                >
            </div>
        )
    }
   
}