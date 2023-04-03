import './App.css';
import MainBtnToMenu from "./Components/MainBtnToMenu";
import Bubbles from './Components/Bubbles';
import AudioSup from './Components/AudioSup';
import StartLayer from './Components/StartLayer';
import FirstTheme from "./music/3.mp3";
import SecondTheme from "./music/4.mp3";
import Game from './Components/Game';
import { useState } from 'react';
import BirthDayTheme from "./music/2.mp3";
import ThirdTheme from "./music/1.mp3";
import FourthTheme from "./music/6.mp3";



function App() {
  const [gameClassState, setGameClassName] = useState("covered");
  const [containerClass, setContainerClass] = useState("container");
  const [soundFile, setSoundFile] = useState(FirstTheme);
  const gameThemes = [ThirdTheme,SecondTheme, FourthTheme]

  return (
    <div className="App" >
    <StartLayer/>

    <AudioSup soundFile={soundFile}/>

    <Bubbles />  

    <Game setContainerClass={setContainerClass} setGameClassName={setGameClassName} gameClassState={gameClassState} on/>

    <div className={containerClass}>
      <h1>Happy Birthday!</h1>
      <h2>To the Man</h2>
      <div className="card-content">
        <p>Have a year of amazing adventures, unforgettable moments, and cherished memories.
</p>
        <MainBtnToMenu 
          setContainerClass={setContainerClass} 
          soundFile={soundFile} 
          setSoundFile={setSoundFile} 
          SecondTheme={SecondTheme}
          FirstTheme={FirstTheme}
          setGameClassName={setGameClassName}
          BirthDayTheme= {BirthDayTheme}
          gameThemes = {gameThemes}
        />
       
      </div>
    </div>
    </div>
  );
}

export default App;
