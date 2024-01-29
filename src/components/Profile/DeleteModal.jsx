import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid rgba(0,0,0,0.1)",
  borderRadius: 10,
  boxShadow: 5,
  p: 4,
};

export default function DeleteUserButtomModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { deleteUserAccount } = useAuth();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUserAccount();
    navigate("/");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        disableElevation
        color="error"
        sx={{
          fontWeight: "bold",
          padding: "12px",
          fontSize: "14px",
          borderRadius: 40,
        }}
      >
        Delete user
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you would delete your account?
          </Typography>
          <Box display={"flex"} justifyContent={"end"} gap={2} mt={2}>
            <Button
              variant="outlined"
              color="warning"
              disableElevation
              sx={{ borderRadius: 5, padding: "5px 20px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              disableRipple
              onClick={handleDelete}
              sx={{ borderRadius: 5, padding: "5px 20px" }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
