import React from "react";

export default function die(props){
    const heldStyle = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }
    return(
        <div className="die" onClick={()=> props.heldDice(props.id)} style={heldStyle}>
            <h3> {props.value}</h3>
        </div>
    )
}