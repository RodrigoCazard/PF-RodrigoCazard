import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import countryList from "react-select-country-list";
import { useAuth } from "../../context/AuthContext";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { toast } from "sonner";
import { fetchUserData, updateUser } from "../Utils/users";
import NotLogged from "../NotLogged/NotLogged";

const UpdateUser = () => {
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const countries = countryList().getData();

  const changeHandler = (country) => {
    setCountry(country);
  };
  const { user, isAuthenticated } = useAuth();

  const [isFocused, setIsFocused] = useState({
    displayName: false,
    phone: false,
    address: false,
    country: false,
  });
  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const inputCountryStyle = {
    border: isFocused.country
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
    "&:hover": {
      border: isFocused.country
        ? "2px solid #9c27b0"
        : "2px solid rgba(0,0,0,0.1)",
    },
  };

  const inputDisplayNameStyle = {
    border: isFocused.displayName
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputPhoneStyle = {
    border: isFocused.phone ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const inputAddressStyle = {
    border: isFocused.address
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    padding: "17px 20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const navigate = useNavigate();
  const handleUpdateUser = () => {
    setIsLoadingUpdate(true);
    if (!displayName || !phone || !address || !country) {
      toast.error("Please complete all fields.");
      setIsLoadingUpdate(false);
      return;
    }
    if (isAuthenticated() && user?.uid) {
      updateUser(user?.uid, { displayName, phone, address, country })
        .then((res) => {
          toast.success("Your personal information has been changed");
          navigate("/profile");
        })
        .finally(() => {
          setIsLoadingUpdate(false);
        });
    } else {
      toast.error("You are not logged in, you cannot update information");
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (isAuthenticated() && user?.uid) {
      (async () => {
        try {
          const userData = await fetchUserData(user?.uid);
          setDisplayName(userData.displayName);
          setCountry(userData.country);
          setPhone(userData.phone);
          setAddress(userData.address);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      console.log("User not authenticated");
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.uid]);

  return (
    <>
      {isLoadingUpdate && (
        <Backdrop
          open={isLoadingUpdate}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
        <Typography color="text.primary">Update information</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Update information
        </Typography>
        <Typography variant="h3" component="h2">
          Change your personal information
        </Typography>
      </Box>
      <>
        {isAuthenticated() ? (
          <>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                height={"30vh"}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                marginTop={10}
                marginBottom={17}
                marginX={"auto"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                width={{
                  xs: "100%",
                  sm: "80%",
                  md: "60%",
                  lg: "40%",
                  xl: "40%",
                }}
              >
                <Box width={"100%"} mx="auto">
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: "1px" }}
                    mb={3}
                  >
                    Full name
                  </Typography>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(
                        /[^A-Za-z ]/g,
                        ""
                      );

                      setDisplayName(inputValue);
                    }}
                    placeholder="Full name"
                    style={{ ...inputStyle, ...inputDisplayNameStyle }}
                    onFocus={() => handleFocus("displayName")}
                    onBlur={() => handleBlur("displayName")}
                  />
                </Box>
                <Box width={"100%"} mx="auto">
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: "1px" }}
                    mb={3}
                  >
                    Phone number
                  </Typography>

                  <PhoneInput
                    defaultCountry="uy"
                    placeholder="Phone number"
                    value={phone}
                    hideDropdown
                    countrySelectorStyleProps={{
                      style: {
                        marginLeft: 20,
                        display: "flex",

                        alignItems: "center",
                      },
                      buttonStyle: {
                        border: 0,
                      },
                    }}
                    style={{
                      height: "65px",
                      marginBottom: "50px",
                      ...inputPhoneStyle,
                      transition: "all 0.5s ease",
                      borderRadius: 40,
                    }}
                    inputStyle={{
                      border: "0",
                      height: "61px",
                      ...inputStyle,
                      paddingLeft: 5,
                    }}
                    onChange={(value) => setPhone(value)}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                  ></PhoneInput>
                </Box>
                <Box width={"100%"} mx="auto">
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: "1px" }}
                    mb={3}
                  >
                    Address
                  </Typography>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    placeholder="Address"
                    style={{ ...inputStyle, ...inputAddressStyle }}
                    onFocus={() => handleFocus("address")}
                    onBlur={() => handleBlur("address")}
                  />
                </Box>
                <Box width={"100%"} mx="auto">
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: "1px" }}
                    mb={3}
                  >
                    Country
                  </Typography>
                  <Select
                    value={country}
                    onFocus={() => handleFocus("country")}
                    onBlur={() => handleBlur("country")}
                    onChange={changeHandler}
                    options={countries}
                    placeholder="Select Country"
                    isClearable={true}
                    styles={{
                      option: (base) => ({
                        ...base,
                        fontSize: "20px",
                      }),
                      clearIndicator: (base) => ({
                        ...base,
                        color: "rgba(0,0,0,0.2)",
                        "&:hover": {
                          color: "rgba(0,0,0,0.9)",
                        },
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "rgba(0,0,0,0.2)",
                        "&:hover": {
                          color: "rgba(0,0,0,0.9)",
                        },
                      }),
                      control: (base) => ({
                        ...base,
                        ...inputStyle,
                        cursor: "pointer",

                        border: "2px solid rgba(0,0,0,0.1)",
                        transition: "all 0.5s ease",
                        boxShadow: "none",
                        ...inputCountryStyle,
                        padding: "10px",
                      }),
                    }}
                  />
                </Box>
                <Button
                  width
                  disableElevation
                  disableRipple
                  fullWidth
                  variant="contained"
                  onClick={handleUpdateUser}
                  sx={{
                    padding: "10px 75px",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    borderRadius: 20,

                    height: "60px",
                  }}
                >
                  Update information
                </Button>
              </Box>
            )}
          </>
        ) : (
          <NotLogged></NotLogged>
        )}
      </>
    </>
  );
};

export default UpdateUser;
