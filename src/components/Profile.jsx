"use client";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <Image
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar?.url || "/images/default.png"}
            alt={user?.name}
            width={64}
            height={64}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On: </b>
            {new Date(user?.createdAt).toLocaleDateString("en-US")}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      {/* <UserAddresses /> */}

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
