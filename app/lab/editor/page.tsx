"use client";
import RichTextEditor from "@/src/components/editor/yoopta";
import { Box, Divider, Typography } from "@mui/material";
import { YooptaContentValue } from "@yoopta/editor";
import { useState } from "react";
import { initialContent } from "./initialData";

export default function Page() {
    const [value, setValue] = useState<YooptaContentValue>(initialContent);

    const EDITOR_CANVAS_ID = "editor-canvas";

    // Detect if a click happens outside any child element
    const handleCanvasClick = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        if (target.id === EDITOR_CANVAS_ID) {
            // If contentState is empty, create a new element and focus it
            const newBlockElement = document.getElementById("yoopta-editor");
            newBlockElement?.focus();
            return;
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
                <RichTextEditor value={value} onChange={setValue} />
            </Box>
            <Divider />
            <pre>{JSON.stringify(value, null, 2)}</pre>
        </Box>
    );
}
