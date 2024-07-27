import React, { createRef, RefObject } from "react";

import { Divider, StyledComponentProps } from "@mui/material";
import { withStyles } from "@mui/styles";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { EditableBlockContent } from "./editable-block";
import { getBlockElementId, getRenderForMarkup } from "./editor.utils";

const addStyles = withStyles({
    editableBlock: {
        "&:empty:focus:before": {
            content: "attr(placeholder)",
            pointerEvents: "none",
            display: "block" /* For Firefox */,
            color: "gray",
        },
        outline: "none",
    },
});

export interface ContentEditableWrapperProps
    extends StyledComponentProps<"editableBlock"> {
    state: EditableBlockContent;
    handleChange: (
        newContent: NonNullable<EditableBlockContent["content"]>
    ) => void;
    handleKeyDown: (evt: React.KeyboardEvent) => void;
}

class BaseContentEditableWrapper extends React.Component<
    ContentEditableWrapperProps,
    EditableBlockContent
> {
    contentEditable: RefObject<HTMLElement>;

    constructor(props: ContentEditableWrapperProps) {
        super(props);
        this.contentEditable = createRef<HTMLElement>();
        this.state = { ...props.state };
    }

    handleChange = (evt: ContentEditableEvent) => {
        const sanitizedHtml = sanitizeHtml(evt.target.value);
        this.setState({ ...this.props.state, content: sanitizedHtml });
        this.props.handleChange(sanitizedHtml);
    };

    handleKeyDown = (evt: React.KeyboardEvent) => {
        // Cases
        // - Up / Down -  Navigate
        // - Tab - Indent
        // - Enter - New block
        // - Shift + Tab - Unindent
        // - Shift + Enter - \n character, same block

        console.log("Action: ", evt.key);
        if (
            evt.key === "ArrowUp" ||
            evt.key === "ArrowDown" ||
            evt.key === "Tab" ||
            evt.key === "Enter"
        ) {
            evt.preventDefault();
            this.props.handleKeyDown(evt);
            return;
        }
    };

    componentDidUpdate(
        prevProps: Readonly<ContentEditableWrapperProps>,
        prevState: Readonly<EditableBlockContent>,
        snapshot?: any
    ): void {
        if (prevProps.state.tag !== this.props.state.tag) {
            this.setState({ ...this.props.state });
            setTimeout(() => {
                this.contentEditable.current?.focus();
                console.log("Update Tag: ", this.contentEditable.current);
            }, 0);
        }
    }

    render = () => {
        const { Element, elementProps } = getRenderForMarkup(this.state);

        if (this.state.tag === "divider") {
            return <Divider />;
        }

        return (
            <ContentEditable
                key={this.state.id}
                id={getBlockElementId(this.state.id)}
                className={this.props.classes?.editableBlock}
                tabIndex={-1}
                placeholder="Type here..."
                innerRef={this.contentEditable}
                html={this.state.content || ""} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                onKeyDown={this.handleKeyDown}
                // onBlur={this.handleBlur} // handle innerHTML change
                tagName={Element as string} // Use a custom HTML tag (uses a div by default)
                {...elementProps}
                style={{}}
            />
        );
    };
}

const ContentEditableWrapper = addStyles(BaseContentEditableWrapper);

export { ContentEditableWrapper };
