import { prisma } from "@/db/client";
import { LinkTarget, LinkTargetList } from "@/db/types";
import { EditablePlainText } from "@/src/components/editable-plain-text";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  params: {
    entity: string;
    entityType: LinkTarget;
  };
}

export default async function Page({ params: { entity, entityType } }: Props) {
  const note = await prisma.note.findFirst({
    where: {
      id: entity,
    },
  });

  if (!note) {
    return <Box>Entity not found</Box>;
  }

  return (
    <Box>
      <EditablePlainText />
      <Typography variant="h5">{entityType}</Typography>
      <Typography variant="subtitle2">{entity}</Typography>
      <pre>{JSON.stringify(note, null, 2)}</pre>
      <Divider />
      <Box display="flex" flexDirection="column" gap={4}>
        <FormControl fullWidth>
          {/* <InputLabel>Title</InputLabel> */}
          <TextField placeholder="Title" value={note.title} />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Entity Type</InputLabel>
          <Select label="Type" value={note.type}>
            {LinkTargetList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
