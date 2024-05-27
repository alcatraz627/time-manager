import { Box, Typography } from "@mui/material";
import { EntityListTable } from "./entity-list-table";
import { EntityTypes, fetchEntityListData } from "./utils";

interface Props {
  params: {
    entityType: EntityTypes;
  };
}

export default async function Page({ params: { entityType } }: Props) {
  if (!(entityType in EntityTypes)) {
    return (
      <Box
        sx={{
          mb: "auto",
          py: "25%",
          bgcolor: "grey.50",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">{entityType}</Typography>
        <Typography variant="h6">Invalid Entity Type</Typography>
      </Box>
    );
  }

  const listData = await fetchEntityListData(entityType);

  if (!(listData && listData.rows?.length > 0)) {
    return (
      <Box
        sx={{
          mb: "auto",
          py: "25%",
          bgcolor: "grey.50",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">{entityType}</Typography>
        <Typography variant="h6">No Data Found</Typography>
      </Box>
    );
  }

  const columns: string[] =
    listData && listData?.rows?.length > 0 ? Object.keys(listData.rows[0]) : [];

  const rows = listData?.rows;

  return (
    <Box>
      <EntityListTable rows={rows} columns={columns} />
    </Box>
  );
}
