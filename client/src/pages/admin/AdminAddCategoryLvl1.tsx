import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCategory, reset } from "../../features/category/categorySlice";
import { toast } from "react-toastify";

function AdminAddCategoryLvl1() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const { isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      createCategory({
        category,
      })
    );

    // Reset the form after submission
    setCategory({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("1st lvl category created");
    }
    dispatch(reset());
  }, [dispatch, message, isSuccess, isError, isLoading]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New First-Level Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-gray-700 text-sm font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
            value={category.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-gray-700 text-sm font-bold"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
            value={category.description}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AdminAddCategoryLvl1;
