"use server";
import { Note } from "@prisma/client";
import { prisma } from "../client";
import { CreateOmitProperties, UpdateOmitProperties } from "./common";

export interface CreateNoteDetails extends Omit<Note, CreateOmitProperties> {}
export const createNote = async (data: CreateNoteDetails): Promise<Note> => {
  const { content, ...other } = data;

  return await prisma.note.create({
    data: {
      ...other,
      content: JSON.stringify(content),
    },
  });
};

export interface UpdateNoteDetails
  extends Partial<Omit<Note, UpdateOmitProperties>> {}
export const updateNote = async (data: UpdateNoteDetails): Promise<Note> => {
  const { content, ...other } = data;

  return await prisma.note.update({
    where: { id: data.id },
    data: {
      ...other,
      content: JSON.stringify(content),
    },
  });
};

// TODO: Soft Delete
// https://www.prisma.io/docs/orm/prisma-client/client-extensions/middleware/soft-delete-middleware
export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  return await prisma.note.delete({
    where: { id },
  });
};
