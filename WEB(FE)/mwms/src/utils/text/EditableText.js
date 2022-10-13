import React, { useState } from "react";
import EditText from "./EditText.js";

// Create an ElementMaker component
function EditableText(props) {
    
    const [fullName, setFullName] = useState(props.value);
    const [showInputEle, setShowInputEle] = useState(false);
  
    return (
      <div>
          <EditText
              value={fullName}
              color={props.color}
              handleChange={(e) => {
                props.handleChange(e.target.value, props.iid);
                setFullName(e.target.value);
            }}
              
              handleDoubleClick={() => setShowInputEle(true)}
              handleBlur={() => setShowInputEle(false)}
              showInputEle={showInputEle}
          />
      </div>
    );
}


export default EditableText;