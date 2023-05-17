import { useEffect } from "react";
import { reset, setCurrentPage } from "../../features/product/productSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AsyncThunk } from "@reduxjs/toolkit";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RootState } from "../../app/store";

type PropTypes = {
  sliceName: keyof RootState;
  fetchDataAction: AsyncThunk<any,any,any>
}

const Pagination = ({ sliceName, fetchDataAction }: PropTypes ) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { currentPage, totalPages, isError, message, isSuccess, isLoading } =
    useAppSelector((state) => state[sliceName]);

  useEffect(() => {
    let abortController = new AbortController();

    dispatch(fetchDataAction({ abortController, page: currentPage }));

    return () => {
      abortController.abort();
    };
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, isLoading]);

  const handleClick = (page :number) => {
    dispatch(setCurrentPage(page));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handleClick(i)}
            className={`block h-8 w-8 rounded border border-gray-100 bg-base text-center leading-8 text-base ${
              currentPage === i
                ? "text-indigo-500 bg-indigo-100"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      <li>
        <button
          onClick={() => currentPage > 1 && dispatch(setCurrentPage(currentPage - 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-basr bg-base text-base rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <FaChevronLeft />
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button
          onClick={() => currentPage < totalPages  && dispatch(setCurrentPage(currentPage + 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-base text-base rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <FaChevronRight />
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
