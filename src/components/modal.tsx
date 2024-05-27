import { Fade, Modal, ModalProps } from "@mui/material";

interface Props extends ModalProps {
  children: JSX.Element;
}

export const ModalWrapper = ({ children, ...other }: Props) => {
  return (
    <Modal
      disableAutoFocus
      {...other}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(0.5px)",
            bgcolor: "#0004",
          },
        },
      }}
    >
      <Fade in={other.open}>{children}</Fade>
    </Modal>
  );
};
