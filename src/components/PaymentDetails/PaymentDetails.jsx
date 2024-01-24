import React, { useRef, useState } from "react";
import Card from "react-credit-cards-2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../Utils/format";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Box, Typography } from "@mui/material";

const PaymentDetails = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",

    issuer: "",
  });

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
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(state, null, 2));

    const formData = {
      ...state,
    };

    console.log("Form Data:", formData);
  };

  return (
    <Box mb={5}>
      <Typography color={"error"} variant={"h3"} textAlign={"center"}>
        {" "}
        Do not use this section, still in development.
      </Typography>
      <div>
        <Card
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          callback={(type) => handleCallback({ issuer: type }, true)}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="tel"
              name="number"
              value={state.number}
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={state.name}
              placeholder="Name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                value={state.expiry}
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
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
