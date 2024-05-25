import { Link } from "@/db/types";
import { CheckBoxOutlined, Flag, Notes } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Goal, Note, Task } from "@prisma/client";

export interface Props {
  link: Link;
  linkData: Task | Goal | Note | undefined;
}

export const DrawerItem = ({ link, linkData }: Props) => {
  if (!linkData) {
    return null;
  }

  return (
    <ListItem key={link.target_id} disablePadding dense>
      <ListItemButton>
        <ListItemIcon>
          {link.target === "Goal" && <Flag />}
          {link.target === "Task" && <CheckBoxOutlined />}
          {link.target === "Note" && <Notes />}
        </ListItemIcon>
        <ListItemText primary={linkData?.title} />
      </ListItemButton>
    </ListItem>
  );
};
