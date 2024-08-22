"use client";

import { Box } from "@mui/material";
import { YooptaContentValue } from "@yoopta//editor";
import YooptaStarterKit, { MediaUploadsFn } from "@yoopta/starter-kit";

// TODO: Better upload functionality
import { uploadToCloudinary } from "@/src/utils/upload";
import { useRef } from "react";

export interface RichTextEditorProps {
    value: YooptaContentValue;
    onChange: (value: YooptaContentValue) => void;
}

const media: MediaUploadsFn = {
    imageUpload: async (file) => {
        const data = await uploadToCloudinary(file, "image");

        return {
            src: data.secure_url,
            alt: "cloudinary",
            sizes: {
                width: data.width,
                height: data.height,
            },
        };
    },
    fileUpload: async (file) => {
        const response = await uploadToCloudinary(file, "auto");
        return { src: response.url, name: response.name };
    },
    videoUpload: async (file) => {
        const data = await uploadToCloudinary(file, "video");
        return {
            src: data.secure_url,
            alt: "cloudinary",
            sizes: {
                width: data.width,
                height: data.height,
            },
        };
    },
};

export default function RichTextEditor({
    value,
    onChange,
}: RichTextEditorProps) {
    const selectionRef = useRef<HTMLDivElement | null>(null);
    console.log(value);

    return (
        <Box ref={selectionRef}>
            <YooptaStarterKit
                id="yoopta-editor"
                selectionBoxRoot={selectionRef}
                value={value}
                onChange={onChange}
                style={{ width: 650, fontSize: 40 }}
                // selectionRef={selectionRef}
                placeholder="Start typing here..."
                media={media}
            />
        </Box>
    );
}
