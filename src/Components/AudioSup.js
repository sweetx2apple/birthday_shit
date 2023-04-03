import   React from "react";
import "./AudioSup.css"

export default function AudioSup (props) {
    
   

    return (
    <audio loop controls id="audio">
        <source src={props.soundFile} type="audio/mp3" />
    </audio>
    )
}
