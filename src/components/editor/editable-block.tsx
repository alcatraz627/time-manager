import { DragIndicator } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
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
    handleKeyDown: (evt: React.KeyboardEvent) => void;
}

const useStyles = makeStyles({
    blockContainer: {
        display: "flex",
        alignItems: "center",

        position: "relative",

        width: "100%",
        // minHeight: "1.2em",
        minHeight: "2em",
        marginBottom: "0.5em",
        // maxHeight: "2em",
        verticalAlign: "middle",
        border: "0.25px solid",
        borderColor: "transparent",
        transition: "border-color 0.1s",
        left: "10px",

        "&:hover": {
            borderColor: "#ccc",

            "& .dragIndicator": {
                display: "block!important",
            },
        },
    },
    dragIndicator: {
        position: "absolute",
        left: "-20px",
        color: grey[500],
        cursor: "move",
        border: "1px solid red",
        margin: "auto",
        // display: "none",
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
            />
        </Box>
    );
};
