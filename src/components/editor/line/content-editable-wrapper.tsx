import React, {
    createRef,
    KeyboardEventHandler,
    MouseEventHandler,
    RefObject,
} from "react";

import styled from "@emotion/styled";
import { Divider, StyledComponentProps } from "@mui/material";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { EditableBlockContent, getBlockElementId } from "../editor.utils";

export interface ContentEditableWrapperProps
    extends StyledComponentProps<"editableBlock"> {
    state: EditableBlockContent;
    handleChange: (
        newContent: NonNullable<EditableBlockContent["content"]>
    ) => void;
    // handleKeyDown: (evt: React.KeyboardEvent) => void;
    handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
    handleMouseUp: MouseEventHandler<HTMLDivElement>;
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

    handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (evt) => {
        // Cases
        // - Up / Down -  Navigate
        // - Tab - Indent
        // - Enter - New block
        // - Shift + Tab - Unindent
        // - Shift + Enter - \n character, same block

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
        // If tag was updated in props
        if (prevProps.state.tag !== this.props.state.tag) {
            // Update the state
            this.setState({ ...this.props.state });
            setTimeout(() => {
                // Focus back
                this.contentEditable.current?.focus();
            }, 0);
        }
    }

    render = () => {
        const Element = this.state.tag;

        if (this.state.tag === "divider") {
            return <Divider />;
        }

        return (
            <ContentEditable
                key={this.state.id}
                id={getBlockElementId(this.state.id)}
                tabIndex={-1}
                {...{ placeholder: "Type here..." }}
                innerRef={this.contentEditable}
                html={this.state.content || ""} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                onKeyDown={this.handleKeyDown}
                onMouseUp={this.props.handleMouseUp}
                // onBlur={this.handleBlur} // handle innerHTML change
                tagName={Element} // Use a custom HTML tag (uses a div by default)
            />
        );
    };
}

// const ContentEditableWrapper = BaseContentEditableWrapper;

const ContentEditableWrapper = styled(BaseContentEditableWrapper)({
    "&:empty:focus:before": {
        content: "attr(placeholder)",
        pointerEvents: "none",
        display: "block" /* For Firefox */,
        color: "gray",
    },
    outline: "none",
});

export { ContentEditableWrapper };
