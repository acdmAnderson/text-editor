import React, { useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from "slate";

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

  const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true
      });
      return !!match;
    },

    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === "code"
      });

      return !!match;
    },

    isItalicMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true
      });
      return !!match;
    },
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      );
    },

    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? null : "code" },
        { match: n => Editor.isBlock(editor, n) }
      );
    },

    toggleItalicMark(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor);
      Transforms.setNodes(
        editor,
        { italic: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      );
    }
  };

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

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <div>
        <button onMouseDown={mouseCodeBlockEvent}>Code Block</button>
        <button onMouseDown={mouseBoldEvent}>Bold</button>
        <button onMouseDown={mouseItalicEvent}>Italic</button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ 
        fontWeight: props.leaf.bold ? "bold" : "normal" ,
        fontStyle: props.leaf.italic ? "italic" : "normal"
      }}
    >
      {props.children}
    </span>
  );
};


export default TextEditor;
