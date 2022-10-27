import React, { useState } from "react";
import EditText from "./EditText.js";

// Create an ElementMaker component
function EditableText(props) {
    
    const [fullName, setFullName] = useState(props.value);
    const [showInputEle, setShowInputEle] = useState(false);

    const makeName = () => {
      let newName = prompt('새로운 이름을 입력해주세요');
      setFullName(newName);
      props.handleChange(newName, props.iid);
    }

    return (
      <div class="flex justify-center flex-1"> 
        <div onDoubleClick={makeName} className="text-xl inline-block align-middle text-center text-slate-900">
          {props.value}
            {/* <EditText
                value={fullName}
                color={props.color}
                handleChange={(e) => {
                  props.handleChange(e.target.value, props.iid);
                  setFullName(e.target.value);
              }}
                
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                showInputEle={showInputEle}
            /> */}
        </div>
      </div>
    );
}


export default EditableText;