import { Box, List, ListItemButton, Typography } from "@mui/material";
import Link from "next/link";
import { EntityTypes } from "./[entityType]/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="h4" sx={{ pl: 2, py: 2 }}>
        Entity Types
      </Typography>

      <Box display="flex" gap={4}>
        <List disablePadding sx={{ width: "20%" }}>
          {Object.keys(EntityTypes).map((entity) => (
            <ListItemButton
              LinkComponent={Link}
              href={"/admin/entity/" + entity}
              key={entity}
            >
              {entity}
            </ListItemButton>
          ))}
        </List>

        <Box width="80%">{children}</Box>
      </Box>
    </Box>
  );
}
