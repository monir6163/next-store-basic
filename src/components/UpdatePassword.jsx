"use client";

import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";

const UpdatePassword = () => {
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
  });
  const { loading, updatePass } = useContext(AuthContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updatePass(data);
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 text-2xl font-semibold">Update Password</h2>

          <div className="mb-4">
            <label className="block mb-1"> Current Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              name="oldPass"
              value={data.oldPass}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> New Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              name="newPass"
              value={data.newPass}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
