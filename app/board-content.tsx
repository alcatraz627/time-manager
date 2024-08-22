"use client";
import RichTextEditor from "@/src/components/editor/yoopta";
import { OpenInNew } from "@mui/icons-material";
import {
    Box,
    Chip,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from "@mui/material";
import { Note } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { YooptaContentValue } from "@yoopta/editor";
import Link from "next/link";
import { useState } from "react";

export interface BoardContentProps {
    notes: Note[];
    saveNoteToDb: (newVal: Note) => Promise<Note>;
}

export const BoardContent = ({ notes, saveNoteToDb }: BoardContentProps) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [value, setValue] = useState<YooptaContentValue>({});

    // useEffect(() => {
    //     if (notes.length > 0) {
    //         setSelectedNote(notes[0]);
    //         setValue(notes[0].content);
    //     }
    // },[])

    return (
        <Box display={"flex"} flexDirection={"row"}>
            <List sx={{ flex: 1 }}>
                {notes.map((note) => (
                    <ListItem key={note.id}>
                        <ListItemButton
                            selected={selectedNote?.id === note.id}
                            onClick={() => {
                                setSelectedNote(note);
                                setValue(note.content as YooptaContentValue);
                            }}
                        >
                            {note.icon}
                            &nbsp;
                            <Link target="_blank" href={`/note/${note.id}`}>
                                <OpenInNew />
                            </Link>
                            {note.title}
                            &emsp;
                            {note.reminderId && (
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={"Reminder: " + note.reminderId}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box width="100%" sx={{ flex: 4 }}>
                {selectedNote ? (
                    <RichTextEditor
                        value={value}
                        onChange={(value) => {
                            setValue(value);
                            saveNoteToDb({
                                ...selectedNote,
                                content: value as JsonValue,
                            });
                        }}
                    />
                ) : (
                    <Typography
                        variant="h5"
                        sx={{ width: "100%", py: 6 }}
                        textAlign={"center"}
                    >
                        Select a note to edit
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
