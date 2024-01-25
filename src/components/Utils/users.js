import { db } from "../../services/config.js";
import {
  getDocs,
  getDoc,
  collection,
  query,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";

export const fetchUserData = async (userId) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const docSnap = await getDocs(q);

    const data = docSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (data.length > 0) {
      return data[0];
    } else {
      console.error("User not found in Firestore");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const updateUser = async (uid, updateData) => {
  try {
    const userData = await fetchUserData(uid);

    const userDocRef = doc(db, "users", userData.id);

    const isFavorite = isProductInFavorites(userData, updateData.favorites);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = userData.favorites.filter(
        (fav) => fav !== updateData.favorites
      );
    } else {
      updatedFavorites = [...userData.favorites, updateData.favorites];
    }

    const newUser = {
      ...userData,
      ...updateData,
      favorites: updatedFavorites,
    };

    await updateDoc(userDocRef, newUser);

    return { isFavorite: !isFavorite, newUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const isProductInFavorites = (user, productId) => {
  return user?.favorites.includes(productId);
};

export const fetchFavoriteProducts = async (userId) => {
  try {
    const userData = await fetchUserData(userId);

    if (userData && userData.favorites) {
      return userData.favorites;
    } else {
      console.error("User not found in Firestore or has no favorite products");
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    return [];
  }
};

export const getOrders = async (uid) => {
  try {
    const orders = [];
    const purchasesCollection = collection(db, "purchases");

    const querySnapshot = await getDocs(
      query(purchasesCollection, where("userData.id", "==", uid))
    );

    querySnapshot.forEach((doc) => {
      orders.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};
