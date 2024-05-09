"use client";
import { AuthContext } from "@/context/authContext";
import { countries } from "countries-list";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";

const UpdateAddress = ({ id, addresses }) => {
  const countriesList = Object.values(countries);
  const { loading, updateAddress, deleteAddress } = useContext(AuthContext);
  const [data, setData] = useState({
    address: addresses.address,
    city: addresses.city,
    state: addresses.state,
    zip: addresses.zip,
    phone: addresses.phone,
    country: addresses.country,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAddress(id, data);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteAddress(id);
  };

  return (
    <>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Update Address
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Address* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your address"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> City </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your city"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> State </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type state here"
                        name="state"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> ZIP code </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type zip code here"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Phone No </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type phone no here"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Country </label>
                    <select
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      name="country"
                      onChange={handleChange}
                    >
                      {countriesList.map((country) => (
                        <option
                          key={country.name}
                          value={country.name}
                          selected={data.country === country.name}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Update Address"}
                  </button>
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      type="submit"
                      className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Delete Address"}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateAddress;
