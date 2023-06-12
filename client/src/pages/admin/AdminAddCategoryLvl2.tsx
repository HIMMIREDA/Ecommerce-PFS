import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCategory,
  fetchCategories,
  reset,
} from "../../features/category/categorySlice";
import { toast } from "react-toastify";

function AdminAddCategoryLvl2() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    parentCategory: "",
  });

  const { categories, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  // Sample category data

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchCategories(abortController));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isSuccess, isError, isLoading, message]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        category: { name: category.name, description: category.description },
        parentCategoryId: category.parentCategory
      })
    );

    // Reset the form after submission
    setCategory({
      name: "",
      description: "",
      parentCategory: "",
    });
  };


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Second-Level Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
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
        <div className="mb-4">
          <label
            htmlFor="parentCategory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Parent First-Level Category:
          </label>
          <select
            id="parentCategory"
            name="parentCategory"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
            value={category.parentCategory}
            onChange={handleInputChange}
          >
            <option value="">Select a parent category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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

export default AdminAddCategoryLvl2;
