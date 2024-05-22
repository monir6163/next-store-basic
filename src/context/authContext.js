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

  const updatePass = async (passdata) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/auth/passup`, passdata);
      if (data?.status) {
        toast.success("Password Update successful");
        setLoading(false);
        router.push("/me");
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid password");
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

  const updateAddress = async (id, addressData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/address/update?id=${id}`,
        addressData
      );
      if (data?.address) {
        router.refresh();
        toast.success("Address update successfully");
        setLoading(false);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/address/delete?id=${id}`);
      if (data?.address) {
        toast.success("Address delete successfully");
        setLoading(false);
        router.push("/me");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/admin/users/updateUser?id=${id}`,
        userData
      );
      if (data?.status) {
        toast.success("User updated successfully");
        setLoading(false);
        router.push(`/admin/users/${id}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("User update failed");
      setError(error.response.data.message);
    }
  };

  const deleteuser = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/api/admin/users/deleteUser?id=${id}`
      );
      if (data?.status) {
        toast.success("User deleted successfully");
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      toast.error("User delete failed");
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
        updatePass,
        setLoading,
        setError,
        addNewAddress,
        updateAddress,
        deleteAddress,
        clearError,
        updateUser,
        deleteuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
