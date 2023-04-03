import * as reactFlipToolkit from "https://cdn.skypack.dev/react-flip-toolkit@7.0.13";
import  { React, useState, useRef } from "react";
import "./MainBtnToMenu.scss"
 


const { Flipper, Flipped } = reactFlipToolkit;

function MainBtnToMenu (props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  let musictrack = 0;
  const [birhtSong, setBirthSong] = useState(false);

  function toggleState() {
    if (isOpen) return;
    setIsOpen(!isOpen);
    ref.current.blur();
  }

  function toggleStateBack() {
    
    if (isOpen) {
      const audioEl = document.getElementById("audio");
      audioEl.pause();
      if(birhtSong) {
        props.setSoundFile(props.FirstTheme);
        setBirthSong(false);
      } else {
        props.setSoundFile(props.BirthDayTheme);
        setBirthSong(true);
      }
      
      audioEl.load();
      audioEl.play();
      return;
    } 
    setIsOpen(!isOpen);
    ref.current.blur();
   
  }

  function keydownHandler(event) {
    if (event.key === "Enter") {
      toggleState();
    }
  }

  function keydownHandlerBack(event) {
    if (event.key === "Enter") {
      toggleStateBack();
    }
  }

  return (
    <Flipper flipKey={isOpen} spring="stiff" stagger>
      {isOpen ? (
        <Flipped flipId="wrapper">
          <div
            ref={ref}
            tabIndex={isOpen ? false : 0}
            role="dialog"
            className={`dialog animated-in`}
            // onClick={toggleStateBack}
            // onKeyDown={keydownHandlerBack}
          >
            <p className="title content">Зря ты канешн кнопки тыкаешь</p>
            <p className="content">
              Не могу придумать чё подарить..  <strong>но могу повеселить f^^'</strong>
            </p>
            <button
              className="button secondary content hover-border-2"
              onClick={toggleStateBack}
              onKeyDown={keydownHandlerBack}
            >
              Едрить
            </button>
            <button
              className="button primary content hover-border-1"
              onClick={() => {
                setIsOpen(false);
                props.setContainerClass("invisible");
                const audioEl = document.getElementById("audio");
							  audioEl.pause();
                audioEl.addEventListener('ended', () =>{
                  props.setSoundFile(props.SecondTheme[musictrack]);
                  musictrack += 1;
                  audioEl.pause();
                  audioEl.load();
                  audioEl.play();
                });
                props.setSoundFile(props.SecondTheme);
                audioEl.load();
                audioEl.play();
                props.setGameClassName("game");
              }}
            >
              Едет едет трактор за-а му-укой
            </button>
            <div className="mask"></div>
          </div>
        </Flipped>
      ) : (
        <Flipped flipId="wrapper">
          <div
            ref={ref}
            tabIndex={0}
            role="button"
            className="button primary"
            onClick={toggleState}
            onKeyDown={keydownHandler}
            
          >
            <Flipped flipId="action">
              <span className="action">クリック</span>
            </Flipped>
          </div>
        </Flipped>
      )}
    </Flipper>
  );
};

export default MainBtnToMenu
