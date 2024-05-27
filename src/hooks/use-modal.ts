"use client";
import { useState } from "react";

export interface ModalState {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useModalState = (): ModalState => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return { isOpen, handleOpen, handleClose };
};
