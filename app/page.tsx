import { AppLinks } from "@/src/utils/routes";
import {
  Chip,
  List,
  ListItem,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <Typography variant="h4">Pages</Typography>
      <List>
        {AppLinks.map(({ href, title, icon, scope, disabled }) => (
          <ListItem key={href} disabled={disabled}>
            {icon}
            &nbsp;
            <MuiLink component={Link} href={href}>
              {title}
            </MuiLink>
            &emsp;
            <Chip size="small" variant="outlined" label={scope} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
