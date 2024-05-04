"use client";
import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { registerUser, error, clearError, loading, setLoading } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(userData);
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            name="name"
            onChange={handleChange}
            value={userData?.name}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            name="email"
            onChange={handleChange}
            value={userData?.email}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            name="password"
            onChange={handleChange}
            value={userData?.password}
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
