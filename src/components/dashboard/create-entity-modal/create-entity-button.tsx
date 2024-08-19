"use client";
import { useModalState } from "@/src/hooks/use-modal";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { CreateEntityModal } from "./create-entity-modal";

export const CreateEntityButton = () => {
  const { isOpen, handleClose, handleOpen } = useModalState();

  return (
    <>
      <Button
        sx={{
          width: "70%",
          m: "auto",
        }}
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
      >
        New
      </Button>
      <CreateEntityModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
