import { prisma } from "@/db/client";
import { Board, Note, Schedule, User } from "@prisma/client";

export enum EntityTypes {
  Note = "Note",
  User = "User",
  Board = "Board",
  Schedule = "Schedule",
}

export const PrismaModelMap = {
  [EntityTypes.Note]: prisma.note,
  [EntityTypes.User]: prisma.user,
  [EntityTypes.Board]: prisma.board,
  [EntityTypes.Schedule]: prisma.schedule,
};

export type FetchEntityListDataReturn =
  | {
      type: EntityTypes.Note;
      rows: Note[];
    }
  | {
      type: EntityTypes.User;
      rows: User[];
    }
  | {
      type: EntityTypes.Board;
      rows: Board[];
    }
  | {
      type: EntityTypes.Schedule;
      rows: Schedule[];
    }
  | null;

export const fetchEntityListData = async (
  entityType: EntityTypes
): Promise<FetchEntityListDataReturn> => {
  switch (entityType) {
    case EntityTypes.Note:
      const notes = await prisma.note.findMany();
      console.log("Calling Note: ", notes);
      return { rows: notes, type: EntityTypes.Note };
    case EntityTypes.User:
      const users = await prisma.user.findMany();
      console.log("Calling User: ", users);
      return { rows: users, type: EntityTypes.User };
    case EntityTypes.Board:
      const boards = await prisma.board.findMany();
      console.log("Calling Board: ", boards);
      return { rows: boards, type: EntityTypes.Board };
    case EntityTypes.Schedule:
      const schedules = await prisma.schedule.findMany();
      console.log("Calling Schedule: ", schedules);
      return { rows: schedules, type: EntityTypes.Schedule };
    default:
      console.log("called none: ", entityType);
      return null;
  }
};
