import React, { createRef, RefObject } from "react";

import { Divider } from "@mui/material";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { EditableBlockContent } from "./editable-block";
import { getRenderForMarkup } from "./editor.utils";

export interface ContentEditableWrapperProps {
  state: EditableBlockContent;
  handleChange: (
    newContent: NonNullable<EditableBlockContent["content"]>
  ) => void;
}

export class ContentEditableWrapper extends React.Component<
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
    this.setState({ ...this.props.state, content: evt.target.value });
    this.props.handleChange(evt.target.value);
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
        tabIndex={-1}
        innerRef={this.contentEditable}
        html={this.state.content || ""} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={this.handleChange} // handle innerHTML change
        // onBlur={this.handleBlur} // handle innerHTML change
        tagName={Element as string} // Use a custom HTML tag (uses a div by default)
        {...elementProps}
        style={{
          outline: "none",
        }}
      />
    );
  };
}
