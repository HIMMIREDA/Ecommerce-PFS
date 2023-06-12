import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGrandChildCategories } from "../../features/category/categorySlice";
import { fetchBrands } from "../../features/brand/brandSlice";
import { createProduct, reset } from "../../features/product/productSlice";
import ValidationErrors from "../../components/common/ValidationErrors";
import { toast } from "react-toastify";

const AdminAddProduct = () => {
  const { errors, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.product
  );
  const { brands } = useAppSelector((state) => state.brand);
  const { grandChildCategories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const [productForm, setProductForm] = useState<{ [key: string]: any }>({
    name: "",
    price: "",
    categoryName: "",
    brandName: "",
    images: [],
    description: "",
    quantity: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(productForm);
    dispatch(
      createProduct({
        product: {
          name: productForm.name,
          quantity: productForm.quantity,
          price: productForm.price,
          brandName: productForm.brandName,
          categoryName: productForm.categoryName,
          description: productForm.description,
          images: productForm.images,
        },
      })
    );
  };

  useEffect(() => {
    let abortController = new AbortController();

    dispatch(
      fetchGrandChildCategories({
        abortController,
        all: true,
      })
    );
    dispatch(
      fetchBrands({
        abortController,
        all: true,
      })
    );

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if(isSuccess){
      toast.success("product created");
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">New Product</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <ValidationErrors errors={errors} />
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 sm:text-sm"
              placeholder="Enter the product name"
              onChange={handleInputChange}
              value={productForm.name}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 sm:text-sm"
              placeholder="Enter the product price"
              onChange={handleInputChange}
              value={productForm.price}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleInputChange}
              value={productForm.description}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 sm:text-sm"
              placeholder="Enter the product description"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="categoryName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-sm"
              value={productForm.categoryName}
              onChange={handleInputChange}
            >
              <option value={""} defaultChecked>Select a category</option>
              {grandChildCategories?.map((cat) => (
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <select
              id="brand"
              name="brandName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-sm"
              value={productForm.brandName}
              onChange={handleInputChange}
            >
              <option value={""} defaultChecked>Select a brand</option>
              {brands?.map((brand) => (
                <option value={brand.name} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productForm.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 sm:text-sm"
              placeholder="Enter the product quantity"
            />
          </div>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images
            </label>
            <div className="relative">
              <input
                type="file"
                id="images"
                name="images"
                onChange={(e) =>
                  setProductForm((prev) => ({
                    ...prev,
                    images: e.target.files,
                  }))
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              <label
                htmlFor="images"
                className="inline-block bg-white rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Choose Images
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
