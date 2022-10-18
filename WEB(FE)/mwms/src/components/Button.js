import React from "react";


function Button(props)
{
  return (
    <button id={props.id} type="button" onClick={props.handleClick} class={props.class}>
      {props.text}
    </button>
  );
}


export default Button;