import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteBrand, fetchBrands, reset } from '../../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminBrands: React.FC = () => {
  const dispatch = useAppDispatch();
  const { brands, isError, isSuccess, message, isLoading } = useAppSelector((state) => state.brand);

  const handleDelete = (brandId: string) => {
    dispatch(deleteBrand(brandId));
  };

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchBrands({ abortController, all: true }));

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
      <h1 className="mb-8 text-4xl font-bold text-center">Brands List</h1>
      <div className="w-full flex justify-end m-2">
        <Link
          to="/admin/addBrand"
          className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
        >
          Add Brand +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase border-l border-r border-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4">
                  <img src={brand.image.url} alt={brand.name} className="w-16 h-16" />
                </td>
                <td className="px-6 py-4 border-l border-r border-gray-300">
                  {brand.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/admin/brands/${brand.id}`}
                      className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(brand.id)}
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

export default AdminBrands;
