// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";
import { useEffect, useRef } from "react";

function CustomEditor({ value, onChange }: { onChange: Function; value: any }) {
  const editorRef = useRef<any>(); // UseRef to hold editor instance
  useEffect(() => {
    console.log(value);
    if (editorRef.current && value) {
      editorRef.current.editorInstance?.setData(value);
    }
  }, [value]);
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
        editorRef.current = editor; // Store editor instance in useRef
      }}
      config={{
        toolbar: {
          items: ["undo", "redo", "|", "bold", "italic"],
        },
        plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
      }}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default CustomEditor;
