import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createBrand, reset } from "../../features/brand/brandSlice";
import { toast } from "react-toastify";

const AdminAddBrand: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { isSuccess, isError, isLoading, message } = useAppSelector(
    (state) => state.brand
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === "") {
      return;
    }

    if (!image) {
      return;
    }

    dispatch(
      createBrand({
        name: name,
        image: image,
      })
    );
    setName("");
    setImage(null);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("brand created");
    }
    dispatch(reset());
  }, [dispatch, isError, isLoading, isSuccess, message]);

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Add Brand</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-700"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block mb-2 text-lg font-medium text-gray-700"
          >
            Brand Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
          >
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddBrand;
