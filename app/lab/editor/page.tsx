import {
  EditableBlock,
  EditableBlockContent,
} from "@/src/components/editor/editable-block";
import { Typography } from "@mui/material";

const initialContent: EditableBlockContent[] = [
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
];

export default async function Page() {
  return (
    <div>
      <Typography variant="h4">Editor</Typography>
      {initialContent.map((block, idx) => (
        <EditableBlock key={idx} {...block} />
      ))}
    </div>
  );
}
