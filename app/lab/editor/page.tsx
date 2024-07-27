"use client";
import {
  EditableBlock,
  EditableBlockContent,
} from "@/src/components/editor/editable-block";
import {
  MarkupToElementMap,
  TagMatches,
} from "@/src/components/editor/editor.utils";
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
    tag: "h2",
    content: "Second Heading",
  },
  {
    tag: "h4",
    content: "Barely a heading",
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

export default function Page() {
  const [contentState, setContentState] = useState(initialContent);

  const updateBlockState = (blockData: EditableBlockContent) => {
    setContentState((state) => {
      const newState = [...state];
      const updateIdx = newState.findIndex(
        (block) => block.id === blockData.id
      );

      if (updateIdx !== -1) {
        contentState[updateIdx] = blockData;
      }

      return newState;
    });
  };

  const handleBlockUpdate = (blockData: EditableBlockContent) => {
    const newData = {
      ...blockData,
      content: blockData.content || "",
    };

    const currentData = contentState.find(
      (block) => block.id === blockData.id
    )!;

    if (!newData.content || newData.content === currentData.content) {
      return;
    }

    // Look for a possible command for a formatting change match
    // TODO: Add support for command menu
    TagMatches.forEach((tagMatch) => {
      if (
        newData.content.startsWith(tagMatch) &&
        newData.tag !== MarkupToElementMap[tagMatch]
      ) {
        // Update candidate found
        newData.tag = MarkupToElementMap[tagMatch];
        newData.content = newData.content.replace(tagMatch, "");
      }
    });

    updateBlockState(newData);
  };

  return (
    <div>
      <Typography variant="h4">Editor</Typography>
      {contentState.map((block, idx) => (
        <EditableBlock
          key={block.id}
          state={block}
          handleChange={(content) => handleBlockUpdate({ ...block, content })}
        />
      ))}
    </div>
  );
}
