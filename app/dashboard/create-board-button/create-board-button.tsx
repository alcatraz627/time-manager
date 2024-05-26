"use client";
import { useAppContext } from "@/app/context";
import { createBoard } from "@/db/model/board";
import { Add, Save } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

export const CreateBoardButton = () => {
  const [editing, setEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  const { user } = useAppContext();

  const handleCreateBoard = async () => {
    if (!boardTitle.trim()) return;
    if (!user) return;

    return await createBoard({
      title: boardTitle,
      userId: user.id,
      icon: null,
    });

    // TODO: Toast
  };

  const handleCreate = async () => {
    await handleCreateBoard();

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
          placeholder="New Board"
          size="small"
          readOnly={!editing}
          onClick={() => setEditing(true)}
          disableUnderline={!editing}
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
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
