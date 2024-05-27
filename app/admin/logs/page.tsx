import { prisma } from "@/db/client";
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";

type PreviewData = {
  columns: string[];
  data: Record<string, unknown>[];
};

export default async function Page() {
  const users = await prisma.user.findMany();
  const boards = await prisma.board.findMany();
  const notes = await prisma.note.findMany();
  const schedules = await prisma.schedule.findMany();

  const getTableColumns = (
    schema: Record<string, unknown>[],
    custom?: { exclude: string[] } | { include: string[] }
  ) => {
    if (schema.length === 0) {
      return [];
    }

    const keys = Object.keys(schema[0]);

    if (custom) {
      if ("exclude" in custom) {
        return keys.filter((key) => !custom.exclude.includes(key));
      } else {
        return keys.filter((key) => custom.include.includes(key));
      }
    }

    return keys;
  };

  const tables = [
    {
      name: "users",
      data: users,
      exclude: ["password", "created_at", "updated_at"],
    },
    { name: "boards", data: boards, exclude: ["created_at", "updated_at"] },
    { name: "notes", data: notes, exclude: ["created_at", "updated_at"] },
    {
      name: "schedules",
      data: schedules,
      exclude: ["created_at", "updated_at"],
    },
  ];

  const tablesData = tables.map(({ exclude, ...table }) => ({
    ...table,
    columns: getTableColumns(table.data, { exclude }),
  }));

  return (
    <div>
      <Typography variant="h4">Logs</Typography>

      {tablesData.map((tableData) => (
        <>
          <Typography variant="h5">{tableData.name}</Typography>
          {tableData.data.length === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              No Data
            </Box>
          )}
          {tableData.data.length > 0 && (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: "1px solid #ccc7",
                p: 1,
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {tableData.columns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.data.map((row, r) => (
                    <TableRow key={r}>
                      {tableData.columns.map((column, c) => (
                        <TableCell key={c}>
                          {JSON.stringify(
                            (row as Record<string, any>)?.[column]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Divider />
        </>
      ))}
    </div>
  );
}
