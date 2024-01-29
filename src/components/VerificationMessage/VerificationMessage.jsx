import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Alert from "@mui/material/Alert";

const VerificationMessage = () => {
  const { user } = useAuth();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user && !user.reloadUserInfo.emailVerified) {
      setShowMessage(true);
      console.log("entre true");
    } else {
      setShowMessage(false);
    }
  }, [user]);

  return (
    <>
      {showMessage && (
        <Alert
          severity="warning"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background: "rgb(255, 245, 138)",
            zIndex: 99999,
          }}
        >
          Your email is not verified. Please verify your email.
        </Alert>
      )}
    </>
  );
};

export default VerificationMessage;
