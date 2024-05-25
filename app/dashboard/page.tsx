import { prisma } from "@/db/client";
import { Link, LinkTarget } from "@/db/types";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Board, Goal, Note, Task } from "@prisma/client";
import { DrawerContainer } from "./drawer/drawer.container";
import { DrawerSection } from "./drawer/drawer.section";
import { getLinksByCategory } from "./drawer/drawer.utils";

const fetchDrawerData = async (boards: Board[]) => {
  const linksTypeMap = getLinksByCategory(boards);
  const tasks = await prisma.task.findMany({
    where: { id: { in: linksTypeMap.Task } },
  });
  const goals = await prisma.goal.findMany({
    where: { id: { in: linksTypeMap.Goal } },
  });
  const notes = await prisma.note.findMany({
    where: { id: { in: linksTypeMap.Note } },
  });

  const linkDataByTypeMap: Record<LinkTarget, (Task | Goal | Note)[]> = {
    Task: tasks,
    Goal: goals,
    Note: notes,
  };

  return linkDataByTypeMap;
};

export default async function Page({}) {
  const boards = await prisma.board.findMany();
  const linkDataByTypeMap = await fetchDrawerData(boards);

  const getLinkData = (link: Link): Task | Goal | Note | undefined => {
    return linkDataByTypeMap[link.target].find((t) => t.id === link.target_id);
  };

  return (
    <Box display="flex">
      <DrawerContainer>
        <Box display="flex" flexDirection="column" pt={2}>
          <Button
            sx={{
              width: "70%",
              m: "auto",
            }}
            variant="contained"
            startIcon={<Add />}
          >
            New
          </Button>
          {boards.map((board) => (
            <DrawerSection
              key={board.id}
              board={board}
              getLinkData={getLinkData}
            />
          ))}
        </Box>
      </DrawerContainer>
      <Typography variant="h4">Notes here</Typography>
    </Box>
  );
}
