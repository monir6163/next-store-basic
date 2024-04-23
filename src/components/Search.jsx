"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      router.push(`/?keyword=${keyword}`);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        router.push(`/?keyword=${keyword}`);
      } else {
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, router]);
  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 inline-block border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
