import React, { useEffect, useMemo, useState} from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  const onKeyDown = (e, change) =>{
    console.log(e.key);
  }
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => setValue(value)}
      
    >
      <Editable onKeyDown={onKeyDown} />
    </Slate>
  );
};

export default TextEditor