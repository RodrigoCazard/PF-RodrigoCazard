import React, { useEffect, useState } from "react";
import Card from "react-credit-cards-2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "../Utils/format";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { toast } from "sonner";
import Cookies from "js-cookie";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
const PaymentDetails = ({ onChildFormData }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",

    issuer: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe((prev) => !prev);

    if (!rememberMe) {
      loadStoredData();
    }
  };
  const loadStoredData = () => {
    const storedData = Cookies.get("creditCardData");
    if (storedData) {
      const { number, expiry, name, issuer } = JSON.parse(storedData);
      setState({ number, expiry, name, issuer, cvc: "" });
      setRememberMe(true);
    }
  };
  useEffect(() => {
    loadStoredData();
  }, []);

  const [isFocused, setIsFocused] = useState({
    number: false,
    expiry: false,
    cvc: false,
    name: false,
    focused: "",
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));

    if (field === "cvc") {
      setIsFocused((prev) => ({ ...prev, focused: "cvc" }));
    } else {
      setIsFocused((prev) => ({ ...prev, focused: "" }));
    }
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
    if (rememberMe) {
      const { number, expiry, name, issuer } = state;
      Cookies.set(
        "creditCardData",
        JSON.stringify({ number, expiry, name, issuer })
      );
    } else {
      Cookies.remove("creditCardData");
    }
  };

  useEffect(() => {
    // Update issuer in the stored data when rememberMe is true
    if (rememberMe) {
      const { number, expiry, name, issuer } = state;
      Cookies.set(
        "creditCardData",
        JSON.stringify({ number, expiry, name, issuer })
      );
    } else {
      Cookies.remove("creditCardData");
    }
  }, [state, rememberMe]);

  const inputNumberStyle = {
    border: isFocused.number
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputExpiryStyle = {
    border: isFocused.expiry
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputCvcStyle = {
    border: isFocused.cvc ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const inputNameStyle = {
    border: isFocused.name ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState((prev) => ({ ...prev, issuer: issuer || "" }));
    }
  };

  const handleInputChange = (evt) => {
    let { name, value } = evt.target;

    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value);
    } else if (name === "name") {
      value = formatName(value);
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    onChildFormData(state);
  }, [state, onChildFormData]);

  const inputStyle = {
    padding: "17px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };

  return (
    <Box mb={5}>
      <Typography color={"error"} variant={"h3"} textAlign={"center"}>
        {" "}
      </Typography>
      <div>
        <Box mb={6}>
          <Card
            focused={isFocused.focused}
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            callback={handleCallback}
          />
        </Box>
        <form>
          <div>
            <input
              style={{ ...inputStyle, ...inputNumberStyle }}
              type="tel"
              name="number"
              value={state.number}
              placeholder="Card Number"
              onFocus={() => handleFocus("number")}
              onBlur={() => handleBlur("number")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              style={{ ...inputStyle, ...inputNameStyle }}
              type="text"
              name="name"
              value={state.name}
              placeholder="Name"
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={handleInputChange}
            />
          </div>

          <Box display={"flex"} justifyContent={"space-around"} gap={2}>
            <div>
              <input
                style={{ ...inputStyle, ...inputExpiryStyle }}
                type="tel"
                name="expiry"
                value={state.expiry}
                placeholder="Valid Thru"
                onFocus={() => handleFocus("expiry")}
                onBlur={() => handleBlur("expiry")}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                style={{ ...inputStyle, ...inputCvcStyle }}
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onFocus={() => handleFocus("cvc")}
                onBlur={() => handleBlur("cvc")}
                onChange={handleInputChange}
              />
            </div>
          </Box>
          <FormControlLabel
            sx={{ marginTop: "-30px", marginRight: "auto" }}
            control={
              <Checkbox
                color="primary"
                icon={<RadioButtonUncheckedIcon fontSize="large" />}
                checkedIcon={<RadioButtonCheckedIcon fontSize="large" />}
                checked={rememberMe}
                onChange={handleRememberMeToggle}
              />
            }
            label={
              <Typography sx={{ letterSpacing: "1px" }} variant="h5">
                Remember my card information
              </Typography>
            }
          />
          <Typography variant="body2" color="textSecondary">
            Note: The CVC of the card is not stored.
          </Typography>
          <input type="hidden" name="issuer" value={state.issuer} />
        </form>
      </div>
    </Box>
  );
};

export default PaymentDetails;
