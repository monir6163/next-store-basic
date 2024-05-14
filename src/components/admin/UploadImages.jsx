"use client";

import { ProductContext } from "@/context/productContext";
import Image from "next/image";
import { useContext, useState } from "react";

const UploadImages = ({ id }) => {
  const [image, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const { updateProductImages, loading } = useContext(ProductContext);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setPreview((prev) => [...prev, reader.result]);
        }
      };
      setImages((prev) => [...prev, file]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    image?.forEach((image) => {
      formData.append("image", image);
    });
    console.log(formData.getAll("image"));
    await updateProductImages(formData, id);
  };

  // remove image from preview and image state array
  const removeImage = (index) => {
    const newPreview = [...preview];
    const newImages = [...image];
    newPreview.splice(index, 1);
    newImages.splice(index, 1);
    setPreview(newPreview);
    setImages(newImages);

    const input = document.getElementById("formFile");

    function removeFile(index) {
      if (input.files.length > 0) {
        let files = Array.from(input.files);
        files.splice(index, 1);
        let newDataTransfer = new DataTransfer();
        files.forEach((file) => {
          newDataTransfer.items.add(file);
        });
        input.files = newDataTransfer.files;
      }
    }
    removeFile(index);
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="mb-3 text-2xl font-semibold">Upload Product Images</h2>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full">
            <input
              className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
              type="file"
              id="formFile"
              multiple
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-5">
          {preview?.map((image, i) => (
            <Image
              key={i}
              src={image}
              onClick={() => removeImage(i)}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Upload Images"}
        </button>
      </form>
    </div>
  );
};

export default UploadImages;
