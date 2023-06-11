import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  deleteProduct,
  fetchAllProducts,
  fetchProducts,
  reset,
} from "../../features/product/productSlice";
import { toast } from "react-toastify";

// type Props = {}

// const products = [
//     {
//       id: 1,
//       name: 'Product 1',
//       price: 10,
//       category: 'Category 1',
//       stock: 5,
//       description: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
//     },
//     // ... other product entries
//   ];

const AdminProducts = () => {
  const { products, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchAllProducts(abortController));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    dispatch(reset());
  }, [dispatch, isError, isLoading, isSuccess, message]);

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Product List</h1>
      <div className=" w-full flex justify-end m-2">
        <Link
          to={`/admin/addProduct`}
          className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
        >
          Add Product +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4 border-l border-r border-gray-300">
                  {product.name}
                </td>
                <td className="px-6 py-4 border-l border-r border-gray-300">
                  ${product.price}
                </td>
                <td className="px-6 py-4 border-l border-r border-gray-300">
                  <ul>
                    <li>{product.category.name}</li>
                    <li>{product.category.subCategories[0].name}</li>
                    <li>
                      {product.category.subCategories[0].subCategories[0].name}
                    </li>
                  </ul>
                </td>
                <td className="px-6 py-4 border-l border-r border-gray-300">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 border-l border-r border-gray-300 text-justify">
                  {product.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(
                          deleteProduct({
                            productId: product.id,
                          })
                        );
                      }}
                      className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
