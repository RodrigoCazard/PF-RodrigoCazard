import { db } from "../../services/config.js";
import {
  getDocs,
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

    if (data) {
      return data[0];
    } else {
      console.log("Usuario no encontrado en Firestore");
    }
  } catch (error) {
    console.error("Error al obtener datos de usuario:", error);
  }
};

export const updateUser = async (uid, updateData) => {
  try {
    const userData = await fetchUserData(uid);

    const userDocRef = doc(db, "users", userData.id);

    // Verificar si el nuevo elemento ya está en favorites

    const isFavorite = isProductInFavorites(userData, updateData.favorites);

    // Actualizar "favorites" eliminando o agregando el elemento según sea necesario
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

    console.log(newUser);
    await updateDoc(userDocRef, {
      ...newUser,
    });

    return { isFavorite: !isFavorite, newUser };
  } catch (error) {
    console.log(error);
  }
};

export const isProductInFavorites = (user, productId) => {
  console.log(user);
  console.log(productId);
  console.log(user.favorites.includes(productId));
  return user.favorites.includes(productId);
};

export const fetchFavoriteProducts = async (userId) => {
  try {
    const userData = await fetchUserData(userId);

    if (userData && userData.favorites) {
      // userData.favorites contiene la lista de productos en favoritos
      return userData.favorites;
    } else {
      console.log(
        "Usuario no encontrado en Firestore o no tiene productos en favoritos"
      );
      return [];
    }
  } catch (error) {
    console.error("Error al obtener productos en favoritos:", error);
    return [];
  }
};
