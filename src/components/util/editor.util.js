import { Transforms, Editor, Text } from "slate";

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
    },

    toggleColor(editor, {hex}) {
      Transforms.setNodes(
        editor,
        { color: hex },
        { match: n => Text.isText(n), split: true }
      );
    }

  };

  export default CustomEditor;