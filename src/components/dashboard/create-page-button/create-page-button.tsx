"use client";
import { useAppContext } from "@/src/utils/context";
import { Add, Save } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

interface Props {
  boardId: string;
}

export const CreatePageButton = ({ boardId }: Props) => {
  const [editing, setEditing] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const { user } = useAppContext();

  const handleCreatePage = async () => {
    if (!pageTitle.trim()) return;
    if (!user) return;

    // TODO: Implement
    // return await createNote({
    //   title: pageTitle,
    //   userId: user.id,
    //   icon: null,
    // });

    // TODO: Toast
  };

  const handleCreate = async () => {
    await handleCreatePage();

    setEditing(!editing);
  };

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <Box onClick={() => setEditing(true)} px={2} py={1}>
        <Input
          startAdornment={
            <InputAdornment position="start">
              <Add fontSize="small" />
            </InputAdornment>
          }
          sx={{
            fontSize: "0.9rem",
            display: "flex",
          }}
          placeholder="New Todo / Note / Goal"
          size="small"
          readOnly={!editing}
          onClick={() => setEditing(true)}
          disableUnderline={!editing}
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
          endAdornment={
            editing && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => handleCreate()}>
                  <Save fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </Box>
    </ClickAwayListener>
  );
};
