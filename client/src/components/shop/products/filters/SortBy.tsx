import { useEffect, useState } from "react";
import {
  fetchProducts,
  setSortOptions,
} from "../../../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const sortingMap = {
  "Name, DESC": { sortBy: "name", sortOrder: "DESC" },
  "Name, ASC": { sortBy: "name", sortOrder: "ASC" },
  "Price, DESC": { sortBy: "price", sortOrder: "DESC" },
  "Price, ASC": { sortBy: "price", sortOrder: "ASC" },
  "CreatedAt, DESC": { sortBy: "CreatedAt", sortOrder: "DESC" },
  "CreatedAt, ASC": { sortBy: "createdAt", sortOrder: "ASC" },
};

function SortBy() {
  const [sortCriteria, setSortCriteria] = useState<string>("Sort By");
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector((state) => state.product);
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
    if (Object.keys(sortingMap).includes(e.target.value)) {
      dispatch(
        setSortOptions(sortingMap[e.target.value as keyof typeof sortingMap])
      );
    }
  };

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchProducts({ abortController, page: 1 }));
  }, [sortBy, sortOrder]);

  return (
    <div>
      <label htmlFor="SortBy" className="block font-medium text-base mb-4">
        Sort By :
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        value={sortCriteria}
        onChange={handleOnChange}
      >
        <option disabled>Sort By</option>
        <option value="Name, DESC">Name, DESC</option>
        <option value="Name, ASC">Name, ASC</option>
        <option value="Price, DESC">Price, DESC</option>
        <option value="Price, ASC">Price, ASC</option>
        <option value="CreatedAt, DESC">CreatedAt, DESC</option>
        <option value="CreatedAt, ASC">CreatedAt, ASC</option>
      </select>
    </div>
  );
}

export default SortBy;
