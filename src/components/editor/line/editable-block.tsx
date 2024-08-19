import { DragIndicator } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { KeyboardEventHandler, MouseEventHandler } from "react";
import { EditableBlockContent } from "../editor.utils";
import { ContentEditableWrapper } from "./content-editable-wrapper";

export interface EditableBlockProps {
    showBlockBorder?: boolean;
    state: EditableBlockContent;
    handleChange: (
        blockContent: NonNullable<EditableBlockContent["content"]>
    ) => void;
    handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
    handleMouseUp: MouseEventHandler<HTMLDivElement>;
}

const useStyles = makeStyles({
    blockContainer: {
        display: "flex",
        alignItems: "center",

        position: "relative",

        width: "100%",
        minHeight: "2em",
        // maxHeight: "2em",
        verticalAlign: "middle",
        border: "0.25px solid",
        // borderColor: "red",
        borderColor: "transparent",
        transition: "border-color 0.1s",
        left: "10px",
        // border: "1px solid red",

        "&:hover": {
            // borderColor: "#ccc",

            "& .dragIndicator": {
                display: "block!important",
            },
        },

        // Tag specific styling
        "& h1": {
            fontSize: "60px",
            letterSpacing: "-1.5px",
            fontWeight: "300",
            lineHeight: "2",
        },
        "& h2": {
            fontSize: "48px",
            fontWeight: "300",
            lineHeight: "1.4",
        },
        "& h3": {
            fontSize: " 34px",
        },
        "& h4": {
            fontSize: "24px",
            fontWeight: "500",
        },
        "& blockquote": {
            // fontFamily: "monospace",
            paddingLeft: "12px",
            lineHeight: "2",
            fontSize: "16px",
            letterSpacing: "0.25px",
            color: "#333",
            borderLeft: "4px solid #aaa",
        },
        "& hr": {
            width: "100%",
        },

        // TODO: b, i, u, code
        // TODO: Custom tag plugin
    },
    dragIndicator: {
        position: "absolute",
        left: "-20px",
        color: grey[500],
        cursor: "move",
        margin: "auto",
        display: "none",
    },
});

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

export const EditableBlock = ({
    state,
    handleChange,
    handleKeyDown,
    handleMouseUp,
}: EditableBlockProps) => {
    const styles = useStyles();

    return (
        <Box className={styles.blockContainer}>
            <Box className={"dragIndicator " + styles.dragIndicator}>
                {/* TODO: implement add block */}
                {/* <Add color="inherit" fontSize="small" /> */}
                <DragIndicator color="inherit" fontSize="small" />
            </Box>
            <ContentEditableWrapper
                state={state}
                //   onBlur={props.handleBlur}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handleMouseUp={handleMouseUp}
            />
        </Box>
    );
};
