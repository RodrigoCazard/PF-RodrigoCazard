import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { toast } from "sonner";

const AuthContext = createContext({
  user: null,
  isAuthenticated: () => false,
  loading: true,
  logout: () => {},
  changeEmail: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const changeEmail = async (newEmail) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await sendEmailVerification(currentUser);
        await updateEmail(currentUser, newEmail);

        alert("Se ha enviado un correo de verificación a la nueva dirección.");
      } catch (error) {
        console.error("Error al cambiar el correo electrónico:", error.message);
        alert("Hubo un error al cambiar la dirección de correo electrónico.");
      }
    } else {
      console.error("Usuario no autenticado.");
      alert("Debe iniciar sesión antes de cambiar el correo electrónico.");
    }
  };

  const deleteUserAccount = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await deleteUser(currentUser);

        toast.success("User deleted successfully.");
      } catch (error) {
        console.log("Error deleting user account:", error.message);
        toast.error("There was an error deleting the user account.");
      }
    } else {
      console.error("User not authenticated.");
      toast.error("You must be logged in before deleting the user account.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        logout,
        changeEmail,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
