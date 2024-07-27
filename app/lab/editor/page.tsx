"use client";
import {
    EditableBlock,
    EditableBlockContent,
} from "@/src/components/editor/editable-block";
import {
    getBlockElementId,
    MarkupToElementMap,
    TagMatches,
} from "@/src/components/editor/editor.utils";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
        tag: "quote",
        content: "A quote from a famous person",
    },
    {
        id: getRandomUuid(),
        tag: "divider",
    },
    {
        id: getRandomUuid(),
        tag: "bold",
        content: "This is a bold text",
    },
    {
        id: getRandomUuid(),
        tag: "italic",
        content: "This is an italic text",
    },
    {
        id: getRandomUuid(),
        tag: "underline",
        content: "This is an underlined text",
    },
];

export default function Page() {
    const [contentState, setContentState] = useState<EditableBlockContent[]>(
        []
    );

    useEffect(() => {
        setContentState(initialContent);
    }, []);

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

    const contentStateWithoutDividers = contentState.filter(
        (block) => block.tag !== "divider"
    );

    // TODO: Move to cursor utils
    const setCursorPosition = (editableElem: HTMLElement, position: number) => {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(editableElem.childNodes[0], position);
        range.collapse(true);

        sel?.removeAllRanges();
        sel?.addRange(range);
        editableElem.focus();
    };

    const getCursorOffset = () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const offset = range?.endOffset || 0;

        return offset;
    };

    // TODO: Move this to separate component
    const handleKeyDown = (
        evt: React.KeyboardEvent,
        blockData: EditableBlockContent
    ) => {
        if (evt.key === "Enter") {
            // TODO: Enter in the middle should split the block
            const blockIdx = contentState.findIndex(
                (block) => block.id === blockData.id
            );

            // Insert a new empty block after the current block
            const newBlock: EditableBlockContent = {
                id: getRandomUuid(),
                tag: "div",
                content: "",
            };

            const newState = [...contentState];
            newState.splice(blockIdx + 1, 0, newBlock);
            setContentState(newState);

            // Focus the new block
            setTimeout(() => {
                const newBlockElement = document.getElementById(
                    getBlockElementId(newBlock.id)
                );
                newBlockElement?.focus();
            }, 0);

            return;
        }

        // Select the upper block on key up
        if (evt.key === "ArrowUp") {
            const blockIdx = contentStateWithoutDividers.findIndex(
                (block) => block.id === blockData.id
            );
            if (blockIdx < 1) return;

            const newBlockElement = document.getElementById(
                getBlockElementId(contentStateWithoutDividers[blockIdx - 1].id)
            );
            if (!newBlockElement) return;

            const currentOffset = Math.min(
                getCursorOffset(),
                newBlockElement.innerText.length
            );
            newBlockElement?.focus();
            setCursorPosition(newBlockElement, currentOffset);

            return;
        }

        // Select the lower block on key down
        if (evt.key === "ArrowDown") {
            const blockIdx = contentStateWithoutDividers.findIndex(
                (block) => block.id === blockData.id
            );

            const newBlockElement = document.getElementById(
                getBlockElementId(contentStateWithoutDividers[blockIdx + 1].id)
            );
            if (!newBlockElement) return;

            const currentOffset = Math.min(
                getCursorOffset(),
                newBlockElement.innerText.length
            );
            newBlockElement?.focus();
            setCursorPosition(newBlockElement, currentOffset);

            return;
        }
    };

    const EDITOR_CANVAS_ID = "editor-canvas";

    // Detect if a click happens outside any child element
    const handleCanvasClick = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        console.log({ target });
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

    // TODO: Add indentation mechanism
    return (
        <Box
            id={EDITOR_CANVAS_ID}
            onClick={handleCanvasClick}
            sx={{
                height: "100%",
            }}
        >
            <Typography variant="h4">Editor</Typography>
            {contentState.map((block) => (
                <EditableBlock
                    key={block.id}
                    state={block}
                    handleChange={(content) =>
                        handleBlockUpdate({ ...block, content })
                    }
                    handleKeyDown={(evt: React.KeyboardEvent) => {
                        handleKeyDown(evt, block);
                    }}
                />
            ))}
        </Box>
    );
}
