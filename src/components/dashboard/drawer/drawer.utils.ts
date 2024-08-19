import { prisma } from "@/db/client";
import { Link } from "@/db/types";
import { Board, Note } from "@prisma/client";

export const getBoardLinks = (board: Board) => {
  const links = ((board.content as any)?.links || []) as Link[];

  return links;
};

export const getAllLinksForBoards = (boards: Board[]): Link[] =>
  boards
    .map((board) => getBoardLinks(board).filter((t) => t.type === "Link"))
    .flat();

export const fetchAllNotesData = async (boards: Board[]): Promise<Note[]> => {
  const allLinks = getAllLinksForBoards(boards);

  const notes = await prisma.note.findMany({
    where: { id: { in: allLinks.map((l) => l.target_id) } },
  });

  return notes;
};
