import { Divider, Typography, TypographyOwnProps } from "@mui/material";
import {
    EditableBlockContent,
    EditableBlockContentTypes,
} from "./editable-block";

export const MarkupToElementMap: Record<string, EditableBlockContentTypes> = {
    "# ": "h1",
    "## ": "h2",
    "### ": "h3",
    "#### ": "h4",
    "&gt; ": "quote", // TODO: Check which one works
    "> ": "quote",
    "`": "code",
};

export const TagMatches = Object.keys(MarkupToElementMap);

export const getRenderForMarkup = (block: EditableBlockContent) => {
    if (!block) {
        return {
            Element: "div",
            elementProps: {},
        };
    }

    let Element: typeof Typography | typeof Divider | string = block.tag;
    let elementProps: TypographyOwnProps = {};

    switch (block.tag) {
        case "divider":
            break;

        case "h1":
            Element = Typography;
            elementProps = { variant: "h3" };

            break;
        case "h2":
            Element = Typography;
            elementProps = { variant: "h4" };

            break;
        case "h3":
            Element = Typography;
            elementProps = { variant: "h5" };

            break;
        case "h4":
            Element = Typography;
            elementProps = { variant: "h6" };

            break;
        case "quote":
            Element = "blockquote";
            break;

        case "bold":
            Element = "strong";
            break;

        case "italic":
            Element = "em";
            break;

        case "underline":
            Element = "u";
            break;

        case "code":
            Element = "code";
            break;
    }

    return {
        Element,
        elementProps,
    };
};

export const getBlockElementId = (blockId: EditableBlockContent["id"]) =>
    "block-" + blockId;
