import React, { useState } from "react";
import Card from "react-credit-cards-2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "../Utils/format";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Box, Typography } from "@mui/material";
import { toast } from "sonner";

const PaymentDetails = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",

    issuer: "",
  });

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
  };
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
      setState((prev) => ({ ...prev, issuer: issuer.issuer || "" }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.name || !state.cvc || !state.number || !state.expiry) {
      toast.error("Please complete all fields.");

      return;
    }

    const formData = {
      ...state,
    };

    console.log(formData);
  };

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
        <form onSubmit={handleSubmit}>
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
          <input type="hidden" name="issuer" value={state.issuer} />
          <div>
            <button type="submit">PAY</button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default PaymentDetails;
