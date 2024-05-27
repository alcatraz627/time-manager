import Editor, { DiffEditorProps, EditorProps } from "@monaco-editor/react";
import { CircularProgress } from "@mui/material";
import { ReactElement } from "react";

export interface CodeEditorProps extends EditorProps {
  readOnly?: boolean;
  hideLineNumbers?: boolean;
  options?: DiffEditorProps["options"];
}

export function CodeEditor({
  readOnly,
  hideLineNumbers,
  options,
  ...editorProps
}: CodeEditorProps): ReactElement {
  // for more options ref - https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html
  const editorOptions: DiffEditorProps["options"] = {
    codeLens: false,
    fontSize: 14,
    fontFamily: "Roboto Mono",
    lineNumbers: hideLineNumbers ? "off" : "on",
    minimap: { enabled: false },
    readOnly,
    scrollBeyondLastLine: true,
    automaticLayout: true,
    find: { addExtraSpaceOnTop: false },
    hover: { above: false },
    padding: {
      top: 12,
      bottom: 8,
    },
    quickSuggestions: true,
    ...options,
  };

  return (
    <Editor
      loading={<CircularProgress />}
      theme="light"
      width="100%"
      height="100%"
      {...editorProps}
      options={editorOptions}
    />
  );
}
