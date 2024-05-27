import { LinkTarget, LinkTargetList } from "@/db/types";
import { ModalWrapper } from "@/src/components/modal";
import { ModalState } from "@/src/hooks/use-modal";
import { KeyboardArrowDown, KeyboardArrowUp, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface Props extends Omit<ModalState, "handleOpen"> {}

export const CreateEntityModal = ({ isOpen, handleClose }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [selectedDataType, setSelectedDataType] = useState<LinkTarget>("Task");

  const handleCreate = () => {};

  return (
    <ModalWrapper onClose={handleClose} open={isOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: expanded ? 1400 : 800,
          maxWidth: "90vw",
          bgcolor: "#fff",
          boxShadow: 16,
          py: 1.5,
          px: 1.5,
          borderRadius: 2,
        }}
      >
        {expanded && (
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ mb: 2, textAlign: "left" }}
          >
            Create New {selectedDataType}
          </Typography>
        )}

        <Box>
          <OutlinedInput
            sx={{ borderRadius: 2 }}
            // variant="standard"
            fullWidth
            placeholder="Enter a Task, Note, or a Goal"
            startAdornment={
              <InputAdornment position="start">
                <ButtonGroup size="small" sx={{ minWidth: 0 }}>
                  {LinkTargetList.map((target) => (
                    <Button
                      key={target}
                      size="small"
                      variant={
                        selectedDataType === target ? "contained" : "outlined"
                      }
                      sx={{
                        p: 0,
                        "&.MuiButtonGroup-grouped": {
                          minWidth: 26,
                        },
                      }}
                      onClick={() => setSelectedDataType(target)}
                    >
                      {target[0]}
                    </Button>
                  ))}
                </ButtonGroup>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleToggleExpanded}>
                  {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        {expanded && (
          <>
            <Box mt={1.5}>
              <OutlinedInput
                placeholder="Enter description, link other tasks or notes"
                multiline
                rows={6}
                fullWidth
                sx={{ borderRadius: 2 }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={1.5}>
              <OutlinedInput placeholder="cadence" size="small" />
              <Button
                variant="contained"
                onClick={handleCreate}
                startIcon={<Save />}
              >
                Create
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ModalWrapper>
  );
};
