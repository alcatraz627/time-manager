import { AddLink, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Input, Menu, MenuItem } from "@mui/material";
import { forwardRef, useState } from "react";

const EditButton = ({
    cmd,
    children,
    arg,
}: {
    cmd: string;
    children: JSX.Element | string;
    arg?: string;
}) => {
    return (
        <Button
            onMouseDown={(e) => {
                e.preventDefault();
                document.execCommand(cmd, true, arg);
            }}
        >
            {children}
        </Button>
    );
};

const EditMenuItem = ({
    cmd,
    children,
    arg,
}: {
    cmd: string;
    children: JSX.Element | string;
    arg?: string;
}) => {
    return (
        <MenuItem
            dense
            onMouseDown={(e) => {
                e.preventDefault();
                document.execCommand(cmd, true, arg);
            }}
        >
            {children}
        </MenuItem>
    );
};

export interface EditorToolbarProps {}

export const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(
    function EditorToolbar(props, ref) {
        const [formatMenuEl, setFormatMenuEl] =
            useState<HTMLButtonElement | null>(null);
        const [linkMenuEl, setLinkMenuEl] = useState<HTMLButtonElement | null>(
            null
        );

        return (
            <div
                ref={ref}
                style={{
                    background: "white",
                    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",

                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,

                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ButtonGroup size="small">
                    <EditButton cmd="bold">
                        <strong>B</strong>
                    </EditButton>
                    <EditButton cmd="italic">
                        <em>I</em>
                    </EditButton>
                    <EditButton cmd="underline">
                        <u>U</u>
                    </EditButton>
                    <EditButton cmd="formatBlock" arg="pre">
                        <kbd>&lt;/&gt;</kbd>
                    </EditButton>
                    <EditButton cmd="formatBlock" arg="s">
                        <s>S</s>
                    </EditButton>
                    <Button
                        onClick={(e) => {
                            setFormatMenuEl(e.currentTarget);
                        }}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Format
                    </Button>
                    <Menu
                        open={!!formatMenuEl}
                        onClose={() => setFormatMenuEl(null)}
                        anchorEl={formatMenuEl}
                    >
                        {["h1", "h2", "h3", "h4", "blockquote", "div"].map(
                            (tag) => (
                                <EditMenuItem
                                    cmd="formatBlock"
                                    arg={tag}
                                    key={tag}
                                >
                                    {tag}
                                </EditMenuItem>
                            )
                        )}
                    </Menu>

                    <Button
                        onClick={(e) => {
                            setLinkMenuEl(e.currentTarget);
                        }}
                        endIcon={<AddLink />}
                        name="link"
                    >
                        Link
                    </Button>
                    {/* TODO: Figure out the link */}
                    <Menu
                        open={!!linkMenuEl}
                        onClose={() => setLinkMenuEl(null)}
                        anchorEl={linkMenuEl}
                    >
                        <Box
                            sx={{ px: 1 }}
                            component="form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const children = e.target;

                                // document.execCommand(
                                //     "createLink",
                                //     true,
                                //     "http://localhost:3000/lab/editor"
                                // );
                            }}
                        >
                            <Input
                                size="small"
                                margin="none"
                                sx={{
                                    fontSize: "14px",
                                    width: "300px",
                                }}
                                placeholder="Insert Link"
                            />
                            <Button
                                variant="contained"
                                size="small"
                                type="submit"
                            >
                                Add
                            </Button>
                        </Box>
                    </Menu>
                    <EditButton cmd="undo">Undo</EditButton>
                    <EditButton cmd="redo">Redo</EditButton>
                </ButtonGroup>
            </div>
        );
    }
);
