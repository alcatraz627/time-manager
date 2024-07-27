import { Box, Divider, Typography, TypographyOwnProps } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { createElement } from "react";

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
  | "code";

export interface EditableBlockContent {
  id: string;
  content?: string;
  tag: EditableBlockContentTypes;
}

export interface EditableBlockProps extends EditableBlockContent {
  showBlockBorder?: boolean;
  handleChange: (blockData: EditableBlockContent) => void;
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
  let element: JSX.Element;
  let Tag: typeof Typography | string = props.tag;
  let elementProps: TypographyOwnProps = {};
  let displayStyle: CSSProperties["display"] = "inline-block";

  if (props.tag === "divider") {
    element = <Divider sx={{ my: 1 }} />;
  } else {
    switch (props.tag) {
      case "h1":
        Tag = Typography;
        displayStyle = "block";
        elementProps = { variant: "h3" };

        break;
      case "h2":
        Tag = Typography;
        displayStyle = "block";
        elementProps = { variant: "h4" };

        break;
      case "h3":
        Tag = Typography;
        displayStyle = "block";
        elementProps = { variant: "h5" };

        break;
      case "h4":
        Tag = Typography;
        displayStyle = "block";
        elementProps = { variant: "h6" };

        break;
      case "quote":
        Tag = "blockquote";
        displayStyle = "block";
        break;

      case "bold":
        Tag = "strong";
        break;

      case "italic":
        Tag = "em";
        break;

      case "underline":
        Tag = "u";
        break;

      case "code":
        Tag = "code";
        break;
    }

    element = createElement(Tag, {
      contentEditable: true,
      suppressContentEditableWarning: true,
      border: props.showBlockBorder ? "0.5px dashed #ccc" : "none",
      dangerouslySetInnerHTML: { __html: props.content || "" },
      onKeyUpCapture: (e) => {
        console.log(e.currentTarget.innerHTML);
        props.handleChange({
          ...props,
          content: e.currentTarget.innerHTML,
        });
      },
      ...elementProps,
    });
  }

  return (
    <Box
      sx={{
        ...hoverStyle,
        display: displayStyle,
      }}
    >
      {element}
    </Box>
  );
};
