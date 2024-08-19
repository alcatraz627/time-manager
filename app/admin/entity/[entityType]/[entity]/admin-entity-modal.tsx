"use client";
import { CodeEditor } from "@/src/components/code-editor";
import { ModalWrapper } from "@/src/components/modal";
import { ModalState } from "@/src/hooks/use-modal";
import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  OutlinedInput,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Board, Note, Schedule } from "@prisma/client";
import { useState } from "react";

export interface Props extends Omit<ModalState, "handleOpen"> {
  entityData: Note | Schedule | Board;
  handleSave: (data: Note | Schedule | Board) => Promise<void>;
}

export const AdminEntityModal = ({
  handleClose,
  isOpen,
  entityData,
  handleSave,
}: Props) => {
  const [data, setData] = useState(JSON.stringify(entityData, null, 2));
  const [selectedTab, setSelectedTab] = useState<"form" | "json">("form");

  const handleSaveEntity = async () => {
    try {
      const parsed = JSON.parse(data);
      await handleSave(parsed);
    } catch (error) {
      console.log("Err: ", data);
    }
  };

  return (
    <ModalWrapper onClose={handleClose} open={isOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vh",
          bgcolor: "#fff",
          boxShadow: 16,
          py: 1.5,
          px: 1.5,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 2, textAlign: "left" }}
        >
          Edit Entity
        </Typography>

        <Box>
          <OutlinedInput
            sx={{ borderRadius: 2 }}
            fullWidth
            value={entityData.title}
          />
        </Box>
        <Tabs
          value={selectedTab}
          onChange={(_e, newTab) => {
            setSelectedTab(newTab);
          }}
        >
          <Tab label="Form" value={"form"} />
          <Tab label="JSON" value="json" />
        </Tabs>
        <Box my={"auto"} height={"75%"}>
          {selectedTab === "form" && (
            <CodeEditor value={data} language="json" readOnly />
          )}
          {selectedTab === "json" && (
            <CodeEditor
              value={data}
              onChange={(value) => {
                setData(value || "");
              }}
              language="json"
              theme="vs-dark"
            />
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1.5}>
          <OutlinedInput placeholder="cadence" size="small" />
          <Button
            variant="contained"
            onClick={handleSaveEntity}
            startIcon={<Save />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};
