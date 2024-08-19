import { getCursorOffset, setCursorPosition } from "@/src/utils/cursor";
import { Box } from "@mui/material";
import React from "react";
import { EditableBlock, EditableBlockContent } from "./editable-block";
import {
    MarkupToElementMap,
    TagMatches,
    getBlockElementId,
    getRandomUuid,
} from "./editor.utils";

export interface NotionEditorProps {
    content: {
        id: string;
        blocks: EditableBlockContent[];
    };
    handleChange: (content: EditableBlockContent[]) => void;
}

export const NotionEditor = ({ content, handleChange }: NotionEditorProps) => {
    const contentState = content.blocks || [];

    const setContentState: typeof handleChange = (newState) => {
        handleChange(newState);
    };

    const updateBlockState = (blockData: EditableBlockContent) => {
        const newState = [...contentState];
        const updateIdx = newState.findIndex(
            (block) => block.id === blockData.id
        );

        if (updateIdx !== -1) {
            contentState[updateIdx] = blockData;
        }

        setContentState(newState);
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

    // 1. Key up -> Go to above line, same x offset
    // 2. Key down -> Go to below line, same x offset
    // 3. Enter -> New block below
    // 4. Shift +  Enter -> Insert /n
    // 5. Backspace (on empty line) -> Delete block

    const handleKeyDown = (
        evt: React.KeyboardEvent,
        blockData: EditableBlockContent
    ) => {
        // 3. Enter -> New block below
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

        // 4. Shift +  Enter -> Insert /n
        if (evt.key === "Enter" && evt.shiftKey) {
            console.log("New Line");
            evt.preventDefault();
            document.execCommand("insertText", false, "\n");
            return;
        }

        // 1. Key up -> Go to above line, same x offset
        // TODO: Maintain positioning across font sizes
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

        // 2. Key down -> Go to below line, same x offset
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

        // 5. Backspace (on empty line) -> Delete block
        console.log({ blockData });
        if (evt.key === "Backspace" && blockData.content === "") {
            const blockIdx = contentState.findIndex(
                (block) => block.id === blockData.id
            );

            // If it's the first block, don't delete
            if (blockIdx === 0) {
                // Blur out focus
                evt.preventDefault();
                document.execCommand("selectAll", false);

                return;
            }

            const newState = [...contentState];
            newState.splice(blockIdx, 1);
            setContentState(newState);

            // Focus the previous block
            setTimeout(() => {
                const prevBlockElement = document.getElementById(
                    getBlockElementId(newState[blockIdx - 1].id)
                );
                prevBlockElement?.focus();
            }, 0);

            return;
        }
    };

    // TODO: Add indentation mechanism

    return (
        <Box>
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
};
