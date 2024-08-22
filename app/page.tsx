import { prisma } from "@/db/client";
import { Typography } from "@mui/material";
import { Board, Note } from "@prisma/client";
import {
    EntityTypes,
    fetchEntityListData,
} from "./admin/entity/[entityType]/utils";
import { BoardContent } from "./board-content";

export default async function Page() {
    const noteData = (await fetchEntityListData(EntityTypes.Note))
        ?.rows as Note[];
    const boardData = (await fetchEntityListData(EntityTypes.Board))
        ?.rows as Board[];

    const saveNoteToDb = async (note: Note) => {
        "use server";
        return await prisma.note.update({
            where: { id: note.id },
            data: note as any, // TODO: Fix this,
        });
    };

    return (
        <div>
            <Typography variant="h4">Notes</Typography>
            <BoardContent notes={noteData} saveNoteToDb={saveNoteToDb} />
        </div>
    );
}
