import { Box } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";
import sanitizeHtml from "sanitize-html";
import { ContentEditableWrapper } from "./content-editable-wrapper";

export type EditableBlockContentTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "quote"
  | "bold"
  | "italic"
  | "underline"
  | "divider"
  | "code"
  | "div";

export interface EditableBlockContent {
  id: string;
  content?: string;
  tag: EditableBlockContentTypes;
}

export interface EditableBlockProps {
  showBlockBorder?: boolean;
  state: EditableBlockContent;
  handleChange: (
    blockContent: NonNullable<EditableBlockContent["content"]>
  ) => void;
}

const hoverStyle: CSSProperties = {
  border: "0.25px solid",
  borderColor: "transparent",
  //   display: "inline-block", // TODO: Based on element type
  transition: "border-color 0.1s",
  ":hover": {
    borderColor: "#ccc",
  },
};

// Model changes
// Line will hold internal styling like b, u, i, code
//

// Actions
// Key up/down
// Key left/right
// / key for ctx menu
// ### / ` / * for markdown
// Enter for new line

// UI elements
// Drag handles -> Dragging works

export const EditableBlock = (props: EditableBlockProps) => {
  return (
    <Box
      sx={{
        ...hoverStyle,
        display: "block",
      }}
    >
      <ContentEditableWrapper
        state={{ ...props.state }}
        //   onBlur={props.handleBlur}
        handleChange={(newValue) => {
          props.handleChange(sanitizeHtml(newValue));
        }}
      />
    </Box>
  );
};
