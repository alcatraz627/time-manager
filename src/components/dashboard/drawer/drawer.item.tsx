import { CheckBoxOutlined, Flag, Notes } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Note } from "@prisma/client";

export interface Props {
  note: Note | undefined;
}

export const DrawerItem = ({ note }: Props) => {
  if (!note) {
    return null;
  }

  return (
    <ListItem key={note.id} disablePadding dense>
      <ListItemButton href={`admin/entity/${note.type}/${note.id}`}>
        <ListItemIcon>
          {note.type === "Goal" && <Flag />}
          {note.type === "Task" && <CheckBoxOutlined />}
          {note.type === "Note" && <Notes />}
        </ListItemIcon>
        <ListItemText primary={note?.title} />
      </ListItemButton>
    </ListItem>
  );
};
