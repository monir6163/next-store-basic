"use client";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { user, setError, setLoading, loading } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null); // [1]
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        email: user.email,
      });
      setAvatarPreview(user?.avater?.url || "/images/default.png");
    }
  }, [user]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    setAvatar(file);
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", avatar);
    try {
      const res = await axios.put(`/api/auth/update`, formData);
      await update({
        ...session,
        user: {
          ...session.user,
          ...res.data?.data,
        },
      });
      if (res.data?.status) {
        toast.success("Profile update successfully");
        setLoading(false);
        router.push("/me");
      }
    } catch (error) {
      setLoading(false);
      setError("error updating profile");
    }
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your name"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              required
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <Image
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full"
                  src={avatarPreview}
                  alt="logo"
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  name="avatar"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
