import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Logout from "../Logout/Logout";
import UpdateUser from "../UpdateUser/UpdateUser";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileActions = ({ variant }) => {
  const isAuthenticated = useAuth().isAuthenticated();

  return isAuthenticated ? (
    <>
      <Box
        width={variant ? "200px" : "600px"}
        ml={"auto"}
        bgcolor={"white"}
        height={"fit-content"}
        padding={variant ? "20px 40px" : "40px 80px"}
        border={"2px solid rgba(0,0,0,0.1)"}
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
              <Link sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  disabled
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
              <Link sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled
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
              <Link sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled
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

          <Logout></Logout>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box
        width={variant ? "260px" : "600px"}
        ml={"auto"}
        bgcolor={"white"}
        height={"fit-content"}
        padding={variant ? "20px 40px" : "40px 80px"}
        border={"2px solid rgba(0,0,0,0.1)"}
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
                  border: "2px solid #000",
                },
                marginTop: "40px",
                fontWeight: "bold",
                padding: "12px",
                fontSize: "14px",
                borderRadius: 40,
                letterSpacing: 1,
                border: "2px solid rgba(0,0,0,0.1)",
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
