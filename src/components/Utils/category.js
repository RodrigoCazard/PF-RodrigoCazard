import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../services/config";

import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import React, { createElement } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreIcon from "@mui/icons-material/Store";

export const getCategoryNames = async () => {
  try {
    const categoryNames = [];
    const categoryCollection = collection(db, "categorys");

    const querySnapshot = await getDocs(query(categoryCollection));

    querySnapshot.forEach((doc) => {
      categoryNames.push({
        id: doc.id,
        name: doc.data().category,
        position: doc.data().position,
      });
    });

    categoryNames.sort((a, b) => a.position - b.position);

    return categoryNames;
  } catch (error) {
    console.error("Error fetching category names:", error);
    return null;
  }
};

export const getIconByCategoryName = (categoryName) => {
  switch (categoryName) {
    case "Desktop":
      return React.createElement(DesktopMacOutlinedIcon, {
        fontSize: "large",
        color: "primary",
      });
    case "Laptops":
      return createElement(LaptopIcon, {
        fontSize: "large",
        color: "primary",
      });
    case "Mobile Phones":
      return createElement(PhoneIphoneOutlinedIcon, {
        fontSize: "large",
        color: "primary",
      });
    case "Printers":
      return createElement(LocalPrintshopOutlinedIcon, {
        fontSize: "large",
        color: "primary",
      });
    case "Others":
      return createElement(ControlPointOutlinedIcon, {
        fontSize: "large",
        color: "primary",
      });
    case "Offers":
      return createElement(LocalOfferIcon, {
        fontSize: "large",
        color: "primary",
      });
    default:
      return createElement(StoreIcon, {
        fontSize: "large",
        color: "primary",
      });
  }
};
