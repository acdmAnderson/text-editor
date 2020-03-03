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
          fontSize: parseInt(props.leaf.fontSize || 16),
          color: props.leaf.color
        }}
      >
        {props.children}
      </span>
    );
  },
};

export default Render;
