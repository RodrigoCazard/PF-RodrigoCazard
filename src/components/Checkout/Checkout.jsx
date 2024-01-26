import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/config";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import CartContext from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { toast } from "sonner";
import CartPreview from "../Cart/CartPreview";
import Login from "../Login/Login";
import ProfileDetails from "../Profile/ProfileDetails";
import PaymentDetails from "../PaymentDetails/PaymentDetails";
import Order from "../Orders/Order";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart, total, quantity, cartClear } = useContext(CartContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [orderID, setOrderID] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const docSnap = await getDocs(q);

        const data = docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (data) {
          setUserData(data[0]);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    }
  }, [user?.uid, isAuthenticated]);

  const steps = ["User Details", "Shipping Details", "Payment Details"];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).filter((step) => completed[step] === true)
      .length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = false;
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handlePurchase = async () => {
    setLoading(true);
    if (!isAuthenticated()) {
      toast.error("You must log in to make a purchase");
      setLoading(false);
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add items before making a purchase.");
      setLoading(false);
      return;
    }

    if (
      !formData.name ||
      !formData.cvc ||
      !formData.expiry ||
      formData.number.length < 19
    ) {
      toast.error("Your payment details are incomplete.");
      setLoading(false);
      return;
    }

    const [month, year] = formData.expiry.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      toast.error("Invalid expiration date");
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const purchasesCollection = collection(db, "purchases");

    try {
      const docRef = await addDoc(purchasesCollection, {
        userData: {
          id: user?.uid,
          userName: user?.displayName,
          userPhone: userData?.phone,
          userAddress: userData?.address,
          userEmail: user?.email,
          userCountry: userData?.country,
        },
        products: cart.map((product) => ({
          id: product.item.id,
          name: product.item.name,
          quantity: product.quantity,
          img: product.item.img,
          price: product.item.price,
        })),

        paymentInfo: formData,
        total: total,
        quantity: quantity,
        timestamp: serverTimestamp(),
      });

      setOrderID(docRef.id);

      toast.success(`Purchase successful. Ticket created: ${docRef.id}`);
      handleComplete();
      cartClear();
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error("Error during purchase", error.message);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState(null);

  const handleChildFormData = (paymentFormData) => {
    setFormData(paymentFormData);
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

  return (
    <Box>
      {loading && (
        <Backdrop
          open={loading}
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
        <StyledLink to="/cart">Cart</StyledLink>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Almost There
        </Typography>
        <Typography variant="h3" component="h2">
          Checkout
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }} mt={10} mb={3}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} disabled completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                disableRipple
              >
                <Typography variant={"body1"} sx={{ mt: 2, mb: 1 }}>
                  {label}
                </Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box display={"flex"} gap={7} marginBottom={10}>
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            md={12}
            lg={allStepsCompleted() && activeStep === 3 ? 12 : 7}
          >
            {isAuthenticated() ? (
              <Box
                padding={
                  allStepsCompleted() && activeStep === 3 ? 0 : "40px 80px"
                }
                border={
                  allStepsCompleted() && activeStep === 3
                    ? "0"
                    : "2px solid rgba(0,0,0,0.1)"
                }
                borderRadius={15}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "40px",
                  }}
                >
                  {" "}
                  {steps[activeStep]}
                </Typography>
                {activeStep === 0 && <ProfileDetails profile />}
                {activeStep === 1 && <ProfileDetails shipping />}
                {activeStep === 2 && (
                  <PaymentDetails onChildFormData={handleChildFormData} />
                )}
                <div>
                  {allStepsCompleted() && activeStep === 3 && (
                    <Box>
                      <Order orderId={orderID}></Order>
                    </Box>
                  )}
                </div>
                <Box display={"flex"} justifyContent={"space-between"}>
                  {activeStep !== 3 && activeStep !== 0 && (
                    <React.Fragment>
                      <Button
                        color="warning"
                        sx={{
                          borderRadius: 20,

                          "&:hover, &:focus": {
                            border: "2px solid #000",
                          },
                          border: "2px solid rgba(0,0,0,0.1)",
                          width: "45%",
                          padding: "12px 22px",
                          fontSize: 18,
                          fontWeight: "bold",
                          minWidth: "150px",
                          letterSpacing: 1,
                        }}
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </React.Fragment>
                  )}

                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Button
                        disableElevation
                        disableRipple
                        variant="contained"
                        sx={{
                          padding: "10px 50px",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          borderRadius: 20,
                          height: "60px",
                          width: activeStep === 0 ? "100%" : "45%",
                          minWidth: "150px",
                        }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        disableElevation
                        disableRipple
                        variant="contained"
                        sx={{
                          width: activeStep === 0 ? "100%" : "45%",
                          minWidth: "150px",
                          padding: "10px 50px",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          borderRadius: 20,
                          height: "60px",
                        }}
                        onClick={
                          completedSteps() === totalSteps() - 1
                            ? handlePurchase
                            : handleComplete
                        }
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    ))}
                </Box>
              </Box>
            ) : (
              <Box
                padding={"40px 80px"}
                border={"2px solid rgba(0,0,0,0.1)"}
                borderRadius={15}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "40px",
                  }}
                >
                  {" "}
                  Login
                </Typography>
                <Login variant />
              </Box>
            )}
          </Grid>
          {!(completedSteps() === totalSteps()) && (
            <Grid item xs={12} md={12} lg={5}>
              <Box
                padding={"40px 80px"}
                height={"fit-content"}
                border={"2px solid rgba(0,0,0,0.1)"}
                borderRadius={15}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "40px",
                  }}
                >
                  {" "}
                  My Cart
                </Typography>

                <CartPreview checkoutDisable={true} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Checkout;
