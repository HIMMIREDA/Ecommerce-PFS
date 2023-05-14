import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../features/product/productService";
import ReactStars from "react-rating-stars-component";
import { BsCart, BsHeart } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import { useFormik } from "formik";
import ValidationErrors from "../../components/common/ValidationErrors";
import * as Yup from "yup";
import VariationInputList from "../../components/shop/products/VariationInputList";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, reset } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import ImagesNavigation from "../../components/shop/products/ImagesNavigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Product() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { message, isLoading, isError, isSuccess } = useSelector(
    (state) => state.cart
  );

  const addToCartForm = useFormik({
    initialValues: {
      quantity: 1,
      productId,
      // maybe add some product properties later
    },
    validate: (values) => {
      const errors = {};
      if (values.quantity > product.quantity) {
        errors.quantity = `the quantity of product added to cart cant surpass ${product?.quantity}`;
      }
      if (values.quantity <= 0) {
        errors.quantity =
          "the quantity of product added to cart cant be less than zero";
      }
      return errors;
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .max(
          product?.quantity,
          `the quantity of product added to cart cant surpass ${product?.quantity}`
        )
        .min(1, "the quantity of product added to cart cant be less than 1")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        addToCart({
          cartItem: {
            productId: values.productId,
            quantity: values.quantity,
          },
        })
      );
    },
  });

  useEffect(() => {
    let abortController = new AbortController();
    const fetchProductById = async (productId) => {
      const product = await productService.fetchProduct(
        abortController,
        productId
      );
      setProduct(product);
    };

    fetchProductById(productId);
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "cartErrorToast",
      });
    }
    if (isSuccess && message) {
      toast.success(message, {
        toastId: "createUpdateDeleteCartToast",
      });
    }
    dispatch(reset());
  }, [message, isError, isSuccess, isLoading, dispatch]);

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <nav className="flex">
          <ol role="list" className="flex items-center">
            <li className="text-left">
              <div className="-m-1">
                <Link
                  to={`/categories/${product?.category?.id}/products`}
                  className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-base-content focus:shadow hover:text-gray-800"
                >
                  {" "}
                  {product?.category?.name}{" "}
                </Link>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link
                    to={`/categories/${product?.category?.subCategories[0]?.id}/products`}
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-base-content focus:shadow hover:text-gray-800"
                  >
                    {" "}
                    {product?.category?.subCategories[0]?.name}{" "}
                  </Link>
                </div>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link
                    to={`/categories/${product?.category?.subCategories[0]?.subCategories[0]?.id}/products`}
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-base-content focus:shadow hover:text-gray-800"
                    aria-current="page"
                  >
                    {" "}
                    {
                      product?.category?.subCategories[0]?.subCategories[0]
                        ?.name
                    }{" "}
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <ImagesNavigation images={product?.images} />

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-base-content sm:text-3xl">
              {product?.name}
            </h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <ReactStars count={5} size={20} color="#ffd700" edit={false} />
                <p className="ml-2 text-sm font-medium text-gray-500">
                  1,209 Reviews
                </p>
              </div>
            </div>
            <ValidationErrors errors={addToCartForm.errors} />
            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                Availability :
                <p
                  className={`ml-2 text-sm font-medium ${
                    product?.quantity > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product?.quantity > 0
                    ? `in stock (${product?.quantity} items)`
                    : "out of stock"}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addToCartForm.handleSubmit();
              } }
              className="mt-3 flex select-none flex-wrap justify-center gap-1 flex-col"
            >
              <VariationInputList />
              <div className="flex items-center justify-start mt-6">
                <h2 className="me-2">Quantity:</h2>
                <button
                  className="border border-gray-400 rounded-l px-3 py-1"
                  type="button"
                  onClick={() => {
                    addToCartForm.setValues({
                      ...addToCartForm.values,
                      quantity:
                        addToCartForm.values.quantity > 1
                          ? addToCartForm.values.quantity - 1
                          : addToCartForm.values.quantity,
                    });
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product?.quantity}
                  className="w-12 text-center border-t border-b border-gray-400 py-1"
                  id="firstName"
                  name="firstName"
                  onChange={addToCartForm.handleChange}
                  value={addToCartForm.values.quantity}
                />

                <button
                  className="border border-gray-400 rounded-r px-3 py-1"
                  type="button"
                  onClick={() => {
                    addToCartForm.setValues({
                      ...addToCartForm.values,
                      quantity:
                        addToCartForm.values.quantity < product?.quantity
                          ? addToCartForm.values.quantity + 1
                          : addToCartForm.values.quantity,
                    });
                  }}
                >
                  +
                </button>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 space-x-3 border-t border-b py-4 md:flex-row sm:space-y-0">
                {product?.price > 0 && (
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">{product?.price}$</h1>
                  </div>
                )}
                {product?.price > 0 && (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-base-content  bg-none px-8 py-3 text-center text-base font-bold text-base-100 transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    <BsCart className="shrink-0 mr-3 h-5 w-5" />
                    Add to cart
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-400  bg-none px-8 py-3 text-center text-base font-bold text-base-100 transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500"
                >
                  <BsHeart className="shrink-0 mr-3 h-5 w-5" />
                  Add to wishlist
                </button>
              </div>
            </form>
          </div>

          <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl  p-1">
                <Tab
                  key={1}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content ",
                      "focus:outline-none focus:ring-2",
                      selected
                        ? " shadow border-b-2 border-base-content"
                        : " hover:bg-base-300 hover:text-base-content"
                    )
                  }
                >
                  Description
                </Tab>
                <Tab
                  key={2}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content",
                      "focus:outline-none focus:ring-2",
                      selected
                        ? " shadow border-b-2 border-base-content"
                        : " hover:bg-base-300 hover:text-base-content"
                    )
                  }
                >
                  Reviews
                </Tab>
                <Tab
                  key={3}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content",
                      "focus:outline-none focus:ring-2",
                      selected
                        ? " shadow border-b-2 border-base-content"
                        : " hover:bg-base-300 hover:text-base-content"
                    )
                  }
                >
                  Add Review
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key={1}
                  className={classNames(
                    "rounded-xl  p-3",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                  )}
                >
                  {product?.description}
                </Tab.Panel>
                <Tab.Panel
                  key={2}
                  className={classNames(
                    "rounded-xl  p-3",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                  )}
                >
                  here's reviews
                </Tab.Panel>
                <Tab.Panel
                  key={3}
                  className={classNames(
                    "rounded-xl  p-3",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                  )}
                >
                  here's add review
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
