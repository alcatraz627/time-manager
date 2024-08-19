"use client";
import { EditableBlockContent } from "@/src/components/editor/editable-block";
import { getBlockElementId } from "@/src/components/editor/editor.utils";
import { NotionEditor } from "@/src/components/editor/notion-editor";
import { Box, Divider, Typography } from "@mui/material";
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
        id: getRandomUuid(),
        tag: "h2",
        content: "Second Heading",
    },
    {
        id: getRandomUuid(),
        tag: "h4",
        content: "Barely a heading",
    },
    {
        id: getRandomUuid(),
        tag: "blockquote",
        content: "A quote from a famous person",
    },
    {
        id: getRandomUuid(),
        tag: "divider",
    },
    {
        id: getRandomUuid(),
        tag: "div",
        content: "<strong>This</strong> is a *bold* text",
    },
    {
        id: getRandomUuid(),
        tag: "div",
        content: "This is an <em>italic</em> text",
    },
    {
        id: getRandomUuid(),
        tag: "div",
        content: "This is an <u><s>underlined</s></u> text",
    },
];

export default function Page() {
    const [contentState, setContentState] =
        useState<EditableBlockContent[]>(initialContent);

    const EDITOR_CANVAS_ID = "editor-canvas";

    // Detect if a click happens outside any child element
    const handleCanvasClick = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        if (target.id === EDITOR_CANVAS_ID) {
            // If contentState is empty, create a new element and focus it
            if (contentState.length === 0) {
                const newBlock: EditableBlockContent = {
                    id: getRandomUuid(),
                    tag: "div",
                    content: "",
                };

                setContentState([newBlock]);

                const newBlockElement = document.getElementById(
                    getBlockElementId(newBlock.id)
                );
                newBlockElement?.focus();
                return;
            }

            // Focus the last block
            const lastBlock = contentState[contentState.length - 1];
            const lastBlockElement = document.getElementById(
                getBlockElementId(lastBlock.id)
            );
            lastBlockElement?.focus();
        }
    };

    return (
        <Box
            id={EDITOR_CANVAS_ID}
            onClick={handleCanvasClick}
            sx={{
                height: "100%",
            }}
        >
            <Typography variant="h4">Editor</Typography>
            <Divider sx={{ my: 2 }} />
            <Box>
                <NotionEditor
                    content={{
                        id: "lab",
                        blocks: contentState,
                    }}
                    handleChange={(...v) => {
                        setContentState(...v);
                        console.log("Updating", ...v);
                    }}
                />
            </Box>
            <Divider />
            <pre>{JSON.stringify(contentState, null, 2)}</pre>
        </Box>
    );
}
