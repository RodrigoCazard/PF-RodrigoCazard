import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/config";

export const getOrder = async (orderId) => {
  try {
    const docRef = doc(db, "purchases", orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const orderInfo = {
        ...docSnap.data(),
        id: docSnap.id,
      };
      return orderInfo;
    } else {
      console.log("No order found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};
