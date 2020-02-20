import React from "react";

const Render = {
  CodeElement: props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  },
  DefaultElement: props => {
    return <p {...props.attributes}>{props.children}</p>;
  },
  Leaf: props => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          fontStyle: props.leaf.italic ? "italic" : "normal",
          color: props.leaf.color 
            ? "#00ff44"//`'#'${Math.random().toString(16).slice(2, 8).toUpperCase()}`
            : "#000"
        }}
      >
        {props.children}
      </span>
    );
  }
};

export default  Render;
