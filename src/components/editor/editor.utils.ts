export type EditableBlockContentTypes =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "blockquote"
    // | "bold"
    // | "italic"
    // | "underline"
    | "divider"
    // | "code"
    | "div";

export interface EditableBlockContent {
    id: string;
    content?: string;
    tag: EditableBlockContentTypes;
}

export const MarkupToElementMap: Record<string, EditableBlockContentTypes> = {
    "# ": "h1",
    "## ": "h2",
    "### ": "h3",
    "#### ": "h4",
    "&gt; ": "blockquote", // TODO: Check which one works
    "> ": "blockquote",
    "! ": "div",
    // "`": "code",
};

export const TagMatches = Object.keys(MarkupToElementMap);

export const getBlockElementId = (blockId: EditableBlockContent["id"]) =>
    "block-" + blockId;

export const getRandomUuid = () => {
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
