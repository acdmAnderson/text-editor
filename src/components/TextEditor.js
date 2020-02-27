import React, { useMemo, useState, useCallback} from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import CustomEditor from "./util/editor.util";

import Render from "./Render";

import "./TextEditor.css"

import { CompactPicker } from "react-color";

const { CodeElement, DefaultElement, Leaf } = Render;

function TextEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
      color: "#000",
    }
  ]);

  const [isRenderColor, setRenderColor] = useState(false);

  const onKeyDown = e => {
    if (!e.ctrlKey) {
      return;
    }
    switch (e.key) {
      case "b":
        e.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      case "y":
        e.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;
      case "i":
        e.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        break;
      default:
        break;
    }
  };

  const mouseBoldEvent = e => {
    e.preventDefault();
    CustomEditor.toggleBoldMark(editor);
  };

  const mouseItalicEvent = e => {
    e.preventDefault();
    CustomEditor.toggleItalicMark(editor);
  };

  const mouseCodeBlockEvent = e => {
    e.preventDefault();
    CustomEditor.toggleCodeBlock(editor);
  };

  const mouseColorEvent = (color, e) => {
    e.preventDefault();
    CustomEditor.toggleColor(editor, color);
    setRenderColor(!isRenderColor);
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  function showColorButton(){
    if(!isRenderColor) setRenderColor(true);
  }
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value);
      }}
    >
      <div className="btn-group">
        <button className="btn btn-primary shadow-btn" onMouseDown={mouseCodeBlockEvent}>Code Block</button>
        <button className="btn btn-primary shadow-btn" onMouseDown={mouseBoldEvent}>Bold</button>
        <button className="btn btn-primary shadow-btn" onMouseDown={mouseItalicEvent}>Italic</button>
        <button className="btn btn-primary shadow-btn display-ilg" onMouseDown={showColorButton}>
          <span >color</span>
          {isRenderColor ? (
            <CompactPicker className="txt-color" color={value.color} onChange={mouseColorEvent} />
          ) : (
            <></>
          )}
        </button>
      </div>
      <Editable
        className="editable shadow"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}

export default TextEditor;
