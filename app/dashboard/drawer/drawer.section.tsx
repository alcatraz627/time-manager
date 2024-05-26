"use client";

import { updateBoard } from "@/db/model/board";
import { Link } from "@/db/types";
import { Edit, Save } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Board, Note } from "@prisma/client";
import { useState } from "react";
import { CreatePageButton } from "../create-page-button/create-page-button";
import { DrawerItem } from "./drawer.item";
import { getBoardLinks } from "./drawer.utils";

export interface Props {
  board: Board;
  notes: Note[];
}

export const DrawerSection = ({ board, notes }: Props) => {
  const [editing, setEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState(board.title);

  const getLinkData = (link: Link): Note | undefined => {
    return notes.find((t) => t.id === link.target_id);
  };

  const handleToggle = () => {
    if (editing) {
      handleUpdateBoard();
    }
    setEditing(!editing);
  };

  const handleUpdateBoard = () => {
    return updateBoard({ id: board.id, title: boardTitle });
  };

  const links = getBoardLinks(board);

  return (
    <Box key={board.id}>
      <List>
        <ListItem
          disablePadding
          sx={{
            pt: 1,
            ml: 1.5,
            "&:hover .edit-button": {
              display: "block",
            },
          }}
        >
          <ListItemText
            primaryTypographyProps={{
              variant: "subtitle2",
              color: "palette.info",
            }}
          >
            <Input
              readOnly={!editing}
              disableUnderline={!editing}
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  handleToggle();
                }
              }}
            />
          </ListItemText>
          <ListItemIcon>
            <IconButton
              size="small"
              onClick={handleToggle}
              className="edit-button"
              sx={{
                px: 1.2,
                display: "none",
              }}
            >
              {editing ? <Save fontSize="small" /> : <Edit fontSize="small" />}
            </IconButton>
          </ListItemIcon>
        </ListItem>

        {links.map((link, l) => (
          <DrawerItem key={l} link={link} linkData={getLinkData(link)} />
        ))}
        {links.length === 0 && (
          <ListItem
            sx={{
              bgcolor: grey[50],
            }}
          >
            <ListItemText sx={{ textAlign: "center" }} secondary="No links" />
          </ListItem>
        )}

        <CreatePageButton boardId={board.id} />
      </List>
      <Divider />
    </Box>
  );
};
