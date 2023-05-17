import ProductItem from "./ProductItem";
import Spinner from "../../common/Spinner";
import { useAppSelector } from "../../../app/hooks";

const ProductItemList = () => {
  const { products, isLoading } = useAppSelector(
    (state) => state.product
  );
  

  if(isLoading){
    return <Spinner />
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductItemList;
