"use client";
import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

interface Props {
  rows: Record<string, unknown>[];
  columns: string[];
}

export const EntityListTable = ({ rows, columns }: Props) => {
  const dataGridProps: DataGridProps = {
    rows,
    columns: columns.map((row) => ({
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
    editMode: "cell",
    isCellEditable: () => true,
    onCellEditStart: (params) => {
      console.log("onCellEditStart", params);
    },
  };
  return (
    <Box>
      <DataGrid {...dataGridProps} />
    </Box>
  );
};
