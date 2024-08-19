"use client";
import { useModalState } from "@/src/hooks/use-modal";
import { Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { Board, Note, Schedule } from "@prisma/client";
import { useState } from "react";
import { AdminEntityModal } from "./[entity]/admin-entity-modal";

interface Props {
  rows: Record<string, unknown>[];
  columns: string[];
}

export const EntityListTable = ({ rows, columns }: Props) => {
  const { isOpen, handleClose, handleOpen } = useModalState();
  const [entityData, setEntityData] = useState<Note | Schedule | Board | null>(
    null
  );

  const handleOpenEditModal = (entityData: Note | Schedule | Board) => {
    setEntityData(entityData);
    handleOpen();
  };

  const handleSave = async (data: Note | Schedule | Board) => {
    console.log("Need to save: ", data);
  };

  const dataGridProps: DataGridProps = {
    rows,
    columns: [
      {
        field: "actions",
        headerName: "",
        minWidth: 50,
        flex: 1,
        renderCell: (params) => {
          return (
            <Box>
              <IconButton
                size="small"
                onClick={() => handleOpenEditModal(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
      ...columns.map<GridColDef>((row) => ({
        field: row,
        headerName: row,
        minWidth: 100,
        flex: 1,
        renderCell: (params) => {
          if (typeof params.value === "object") {
            return <div>{JSON.stringify(params.value)}</div>;
          }
          return <div>{params.value}</div>;
        },
      })),
    ] as GridColDef[],
    // editMode: "cell",
    // isCellEditable: () => true,
    // onCellEditStart: (params) => {
    //   console.log("onCellEditStart", params);
    // },
  };
  return (
    <Box>
      <DataGrid {...dataGridProps} />
      {entityData && (
        <AdminEntityModal
          entityData={entityData}
          isOpen={isOpen}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
    </Box>
  );
};
