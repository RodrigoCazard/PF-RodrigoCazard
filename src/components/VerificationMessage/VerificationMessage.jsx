import React, { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useTheme } from "@emotion/react";
import { Backdrop, CircularProgress } from "@mui/material";

const VerificationMessage = ({ user, verify }) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const handleVerification = () => {
    setIsLoading(true);
    sendEmailVerification(user)
      .then(() => {
        toast.success("We have successfully forwarded your message.");
        setIsLoading(false);
      })
      .catch((error) => {
        let errorMessage = "Send error";
        if (error.code === "auth/too-many-requests") {
          errorMessage =
            "Due to high demand, we have temporarily disabled message forwarding. ";
        }

        toast.error(errorMessage);
        setIsLoading(false);
      });
  };

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user && !verify) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [user, verify]);

  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {showMessage && (
        <Alert
          severity="error"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background: "rgb(255, 245, 138)",
            color: "black",
          }}
        >
          Your email is not verified. Please verify your email.{" "}
          <span
            style={{ color: theme.palette.primary.main, cursor: "pointer" }}
            onClick={handleVerification}
          >
            {" "}
            Resend email
          </span>
        </Alert>
      )}
    </>
  );
};

export default VerificationMessage;
