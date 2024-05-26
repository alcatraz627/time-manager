import { Link } from "@/db/types";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { Board, Note } from "@prisma/client";
import { DrawerItem } from "./drawer.item";
import { getBoardLinks } from "./drawer.utils";

export interface Props {
  board: Board;
  getLinkData: (link: Link) => Note | undefined;
}

export const DrawerSection = ({ board, getLinkData }: Props) => {
  return (
    <Box key={board.id}>
      <List>
        <ListItem disablePadding sx={{ px: 2, pb: 2 }}>
          <Typography variant="h6" color="palette.info">
            {board.title}
          </Typography>
        </ListItem>

        {getBoardLinks(board).map((link, l) => (
          <DrawerItem key={l} link={link} linkData={getLinkData(link)} />
        ))}
      </List>
      <Divider />
    </Box>
  );
};
