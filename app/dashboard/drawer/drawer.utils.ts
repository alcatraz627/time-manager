import { Link, LinkTarget } from "@/db/types";
import { Board } from "@prisma/client";

export const getBoardLinks = (board: Board) => {
  const links = ((board.content as any)?.links || []) as Link[];

  return links;
};

export const getLinksByCategory = (
  boards: Board[]
): Record<LinkTarget, string[]> => {
  const linkTypeMap: Record<LinkTarget, string[]> = {
    Goal: [],
    Note: [],
    Task: [],
  };

  boards.forEach((board) => {
    const links = getBoardLinks(board).filter((t) => t.type === "Link");

    links.forEach((link) => {
      linkTypeMap[link.target].push(link.target_id);
    });
  });

  return linkTypeMap;
};
