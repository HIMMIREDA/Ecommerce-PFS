import React, { useEffect, useState } from "react";
import { Category } from "../../types/category";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCategories,
  reset,
  deleteCategory,
} from "../../features/category/categorySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminCategories = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
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

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const deleteCategoryById = (categoryId: string) => {
    dispatch(deleteCategory({ categoryId }));
  };

  const modifyCategory = (categoryId: string) => {
    // Handle modify logic here
    console.log(`Modifying category with ID ${categoryId}`);
  };

  const renderCategories = (categories: Category[], level = 0) => {
    return categories.map((category: Category, index) => (
      <React.Fragment key={category.id}>
        <tr
          className={`bg-${index % 2 === 0 ? "gray-100" : "white"} ${
            index !== 0 ? "mt-2" : ""
          }`}
        >
          <td
            className={`border px-4 py-2 ${level > 0 ? "pl-8" : ""}`}
            style={{
              borderLeftWidth: level > 0 ? "2px" : "1px",
              textAlign: "left",
            }}
          >
            <div className="flex items-center">
              <div style={{ paddingLeft: `${level * 20}px` }}>
                <span className="border-r-2 pr-2 mr-2">{category.id}</span>
              </div>
            </div>
          </td>
          <td
            className={`border px-4 py-2 cursor-pointer hover:bg-gray-200 ${
              level > 0 ? "pl-8" : ""
            }`}
            style={{ borderLeftWidth: level > 0 ? "2px" : "1px" }}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </td>
          <td
            className={`border px-4 py-2 ${level > 0 ? "pl-8" : ""}`}
            style={{ borderLeftWidth: level > 0 ? "2px" : "1px" }}
          >
            {category.description}
          </td>
          <td className="border px-4 py-2 flex items-center justify-center space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-300 ease-in-out"
              onClick={() => modifyCategory(category.id)}
            >
              Modify
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-300 ease-in-out"
              onClick={() => deleteCategoryById(category.id)}
            >
              Delete
            </button>
          </td>
        </tr>
        {expandedCategories.includes(category.id) &&
          category.subCategories &&
          category.subCategories.length > 0 && (
            <>{renderCategories(category.subCategories, level + 1)}</>
          )}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Category Page
        </h1>
        <div className="w-full flex justify-end space-x-3 m-2">
          <Link
            to={`/admin/addFirstLvlCategory`}
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
          >
            Add 1st lvl category
          </Link>
          <Link
            to={`/admin/addSecondLvlCategory`}
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
          >
            Add 2nd lvl category
          </Link>
          <Link
            to={`/admin/addThirdLvlCategory`}
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
          >
            Add 3rd lvl category
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-collapse border-gray-300">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderCategories(categories)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
