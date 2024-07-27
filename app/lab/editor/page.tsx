"use client";
import {
  EditableBlock,
  EditableBlockContent,
} from "@/src/components/editor/editable-block";
import { Typography } from "@mui/material";
import { useState } from "react";

const getRandomUuid = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export type EditorState = EditableBlockContent[];

const initialContent: EditorState = [
  {
    tag: "h1",
    content: "Heading of the page",
  },
  {
    tag: "h2",
    content: "Heading of the page",
  },
  {
    tag: "h3",
    content: "Heading of the page",
  },
  {
    tag: "h4",
    content: "Heading of the page",
  },
  {
    tag: "quote",
    content: "A quote from a famous person",
  },
  {
    tag: "divider",
  },
  {
    tag: "bold",
    content: "This is a bold text",
  },
  {
    tag: "italic",
    content: "This is an italic text",
  },
  {
    tag: "underline",
    content: "This is an underlined text",
  },
].map((block) => ({ ...block, id: getRandomUuid() } as EditableBlockContent));

// const editorReducer = (state: EditorState, action) => {};

export default function Page() {
  const [contentState, setContentState] = useState(initialContent);

  const updateBlockState = (blockData: EditableBlockContent) => {
    setContentState((current) => {
      let newState = [...current];

      const updateIdx = newState.findIndex(
        (block) => block.id === blockData.id
      );

      if (updateIdx !== -1) {
        newState[updateIdx] = blockData;
      }

      return newState;
    });
  };

  const handleBlockUpdate = ({
    content = "",
    id,
    tag,
  }: EditableBlockContent) => {
    const newData: EditableBlockContent = { content, id, tag };

    if (content.startsWith("# ")) {
      newData.tag = "h1";
      newData.content = content.replace(/^#\s/, "");

      updateBlockState(newData);
    }
  };

  return (
    <div>
      <Typography variant="h4">Editor</Typography>
      {contentState.map((block, idx) => (
        <EditableBlock key={idx} {...block} handleChange={handleBlockUpdate} />
      ))}
    </div>
  );
}
