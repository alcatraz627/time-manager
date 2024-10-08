"use server";
import { Board } from "@prisma/client";
import { prisma } from "../client";
import { Content } from "../types";
import { CreateOmitProperties, UpdateOmitProperties } from "./common";

export interface CreateBoardDetails extends Omit<Board, CreateOmitProperties> {
  content?: Content;
}

export const createBoard = async (data: CreateBoardDetails): Promise<Board> => {
  const { content, ...other } = data;

  return await prisma.board.create({
    data: {
      ...other,
      content: JSON.stringify(content),
    },
  });
};

export interface UpdateBoardDetails
  extends Partial<Omit<Board, UpdateOmitProperties>> {
  content?: Content;
}
export const updateBoard = async (data: UpdateBoardDetails): Promise<Board> => {
  const { content, ...other } = data;

  return await prisma.board.update({
    where: { id: data.id },
    data: {
      ...other,
      content: JSON.stringify(content),
    },
  });
};

// TODO: Soft Delete
// https://www.prisma.io/docs/orm/prisma-client/client-extensions/middleware/soft-delete-middleware
export const deleteBoard = async (id: Board["id"]): Promise<Board> => {
  return await prisma.board.delete({
    where: { id },
  });
};
