import { prisma } from "@/db/client";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CreateBoardButton } from "./create-board-button/create-board-button";
import { CreateEntityButton } from "./create-entity-modal/create-entity-button";
import { DrawerContainer } from "./drawer/drawer.container";
import { DrawerSection } from "./drawer/drawer.section";
import { fetchAllNotesData } from "./drawer/drawer.utils";

export default async function Page({}) {
  const boards = await prisma.board.findMany();
  const notes = await fetchAllNotesData(boards);

  return (
    <Box display="flex">
      <DrawerContainer>
        <Box display="flex" flexDirection="column" pt={2}>
          <CreateEntityButton />
          {boards.map((board) => (
            <DrawerSection key={board.id} board={board} notes={notes} />
          ))}
          <CreateBoardButton />
        </Box>
      </DrawerContainer>
      <Box>
        <Typography variant="h1">Notes here</Typography>
        <Typography variant="h2">Notes here</Typography>
        <Typography variant="h3">Notes here</Typography>
        <Typography variant="h4">Notes here</Typography>
        <Typography variant="h5">Notes here</Typography>
        <Typography variant="h6">Notes here</Typography>
        <Typography variant="subtitle1">Notes here</Typography>
        <Typography variant="body1">Notes here</Typography>
        <Typography variant="subtitle2">Notes here</Typography>
        <Typography variant="body2">Notes here</Typography>
        <Typography variant="caption">Notes here</Typography>
        <Typography variant="overline">Notes here</Typography>
        <Typography variant="button">Notes here</Typography>
      </Box>
    </Box>
  );
}
