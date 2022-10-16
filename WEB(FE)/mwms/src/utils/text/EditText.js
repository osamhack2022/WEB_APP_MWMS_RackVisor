import React from "react";

function EditText(props) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            style={{
              height: "25px",
              width: "150px",
              color: "black",
            }}
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            style={{
              display: "inline-block",
              height: "25px",
              minWidth: "150px",
              color: props.color,
            }}
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default EditText;