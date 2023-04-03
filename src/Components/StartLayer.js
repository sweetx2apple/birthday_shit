import  React, {useRef, useState } from "react";
import "./StartLayer.css"

export default function StartLayer (doPlay) {
	
	let btnClass = useRef("btn");
	let doneTimeout = null;
	let resetTimeout = null;
	let [disabled, setDisabled] = useState(false);
	let [visible, setVisible] = useState("start-layer");
	

	
    return (
		<div className={visible} >
			<button className={btnClass.current} disabled={disabled} type="button" onClick={()=> {
				const runClass = " btn--running";
				const doneClass = " btn--done";
				setDisabled(true);
				const submitDuration = 2000;
				const resetDuration = 1500;
				btnClass.current = "btn" + runClass;
				clearTimeout(doneTimeout);
				clearTimeout(resetTimeout);
			
					doneTimeout = setTimeout(() => {
						btnClass.current = "btn" + doneClass;
						clearTimeout(doneTimeout);
						setDisabled(false);
						resetTimeout = setTimeout(() => {
							setDisabled(true);
							btnClass.current = "btn";
							clearTimeout(resetTimeout);
							const audioEl = document.getElementById("audio");
							audioEl.play();
							setVisible("invisible");
						}, resetDuration);
					}, 600 + submitDuration);
			}}>
				<span className="btn__text">жми</span>
				<svg className="btn__progress" viewBox="0 0 48 48" width="48px" height="48px">
					<circle className="btn__progress-track" r="20" cx="24" cy="24" fill="none" stroke="#c7cad1" strokeWidth="8" />
					<circle className="btn__progress-fill" r="20" cx="24" cy="24" fill="none" stroke="#000000" strokeWidth="8" transform="rotate(-90,24,24)" strokeDasharray="125.66 125.66" strokeDashoffset="125.66" />
				<polyline className="btn__progress-check" points="12,24 20,32 36,16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="34 34" strokeDashoffset="34" />
				</svg>
			</button>
		</div>
    )
}
