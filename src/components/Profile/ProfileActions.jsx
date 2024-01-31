import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Logout from "../Logout/Logout";
import UpdateUser from "../UpdateUser/UpdateUser";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteUserButtomModal from "./DeleteModal";
import { useTheme } from "@emotion/react";

const ProfileActions = ({ variant }) => {
  const theme = useTheme();

  const isAuthenticated = useAuth().isAuthenticated();

  return isAuthenticated ? (
    <>
      <Box
        height={"fit-content"}
        bgcolor={theme.palette.background.paper}
        padding={variant ? "20px 40px" : "40px 80px"}
        border={`2px solid ${theme.palette.border.main}`}
        borderRadius={variant ? 5 : 15}
      >
        {!variant && (
          <Typography variant="h4" mb={5}>
            ProfileActions{" "}
          </Typography>
        )}

        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
        >
          {variant && (
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              sx={{ width: "100px" }}
            >
              <Button
                variant="contained"
                fullWidth
                disableElevation
                sx={{
                  fontWeight: "bold",
                  padding: "12px",
                  fontSize: "14px",
                  borderRadius: 40,
                }}
              >
                Profile
              </Button>
            </Link>
          )}
          {!variant && (
            <>
              <Link to={"/profile/update"} sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  sx={{
                    fontWeight: "bold",
                    padding: "12px",
                    fontSize: "14px",
                    borderRadius: 40,
                  }}
                >
                  Update information
                </Button>
              </Link>
              <Link to={"/profile/password"} sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  sx={{
                    fontWeight: "bold",
                    padding: "12px",
                    fontSize: "14px",
                    borderRadius: 40,
                  }}
                >
                  Change Password
                </Button>
              </Link>
              <Link to={"/profile/email"} sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  sx={{
                    fontWeight: "bold",
                    padding: "12px",
                    fontSize: "14px",
                    borderRadius: 40,
                  }}
                >
                  Change Email
                </Button>
              </Link>
            </>
          )}

          <Link to={"/profile/favorites"} sx={{ width: "100px" }}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                fontWeight: "bold",
                padding: "12px",
                fontSize: "14px",
                borderRadius: 40,
              }}
            >
              Favorites
            </Button>
          </Link>
          <Link to={"/profile/orders"} sx={{ width: "100px" }}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                fontWeight: "bold",
                padding: "12px",
                fontSize: "14px",
                borderRadius: 40,
              }}
            >
              Orders
            </Button>
          </Link>
          {!variant && <DeleteUserButtomModal></DeleteUserButtomModal>}
          <Logout></Logout>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box
        bgcolor={theme.palette.background.paper}
        height={"fit-content"}
        padding={variant ? "20px 40px" : "40px 80px"}
        border={`2px solid ${theme.palette.border.main}`}
        borderRadius={variant ? 5 : 15}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <Link to={"/login"} sx={{ width: "100px" }}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                fontWeight: "bold",
                padding: "12px",
                fontSize: "14px",
                borderRadius: 40,
              }}
            >
              Login
            </Button>
          </Link>
          <Link to={"/register"} sx={{ width: "100px" }}>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              disableElevation
              sx={{
                "&:hover, &:focus": {
                  border: `2px solid ${theme.palette.basicText.main}`,
                },
                marginTop: "40px",
                fontWeight: "bold",
                padding: "12px",
                fontSize: "14px",
                borderRadius: 40,
                letterSpacing: 1,
                border: `2px solid ${theme.palette.border.main}`,
              }}
            >
              Create Account
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ProfileActions;
