"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearError = () => setError(null);

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/register`, userData);

      if (data?.user) {
        toast.success("Registration successful");
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const addNewAddress = async (addressData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/address/create`, addressData);

      if (data?.address) {
        toast.success("Address added successfully");
        setLoading(false);
        router.push("/me");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        setUser,
        registerUser,
        addNewAddress,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
