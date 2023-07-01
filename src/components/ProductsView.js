// consume the useThunk hook
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchProducts } from "../store";
import { Flex, Spinner } from "@chakra-ui/react";

import ProductCard from "./ProductsCard.js";
export default function ProductsView({ limit = 9999 }) {
  const [doFetchProducts, isLoadingProducts, loadingError] =
    useThunk(fetchProducts);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    doFetchProducts();
  }, [doFetchProducts]);

  let content;
  if (isLoadingProducts) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (loadingError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = products?.products
      ?.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })
      .slice(0, limit);
  }

  return (
    <Flex
      wrap={"wrap"}
      gap={"1rem"}
      justifyContent={"space-between"}
      // backgroundColor={"darkcyan"}
      // bgImage={
      //   "https://img.freepik.com/free-vector/flat-design-creative-arabesque-pattern_23-2149190708.jpg?w=826&t=st=1688026758~exp=1688027358~hmac=0337c6cd529cad6b47cd93c1e4fbf8a5d0f98c29cbfa734e9b0cfa3444de79cb"
      // }
      bgGradient={[
        "linear(to-tr, #F2EDE7, #E9D4D1)",
        "linear(to-t, #B63C4F, #AF273C)",
        "linear(to-b, #AF273C, #13070C)",
      ]}
    >
      {content}
    </Flex>
  );
}
