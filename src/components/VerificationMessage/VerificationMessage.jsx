import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Alert from "@mui/material/Alert";

const VerificationMessage = ({ user, verify }) => {
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
          Your email is not verified. Please verify your email.
        </Alert>
      )}
    </>
  );
};

export default VerificationMessage;
