import React, { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useTheme } from "@emotion/react";

const VerificationMessage = ({ user, verify }) => {
  const theme = useTheme();

  sendEmailVerification(user).then(() => {
    toast.success("We have successfully forwarded your message.");
  });

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
            onClick={sendEmailVerification()}
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
