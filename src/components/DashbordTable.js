import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Button,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useThunk } from "../hooks/useThunk";
import { useSelector } from "react-redux";
import { fetchProducts } from "../store";
import { useEffect } from "react";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProduct from "./DeleteProduct";

// create table that show items and give them a button to delete them edit and an add item

export default function TableComponent({ data }) {
  const [doFetchProducts, isLoadingProducts, loadingError] =
    useThunk(fetchProducts);

  const { products } = useSelector((state) => state.products);
  console.log(products);

  //      "products": [
  // {
  //     "_id": "6493212d8652d0201c82d239",
  //     "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     "img": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "price": 109.95,
  //     "category": "men's clothing",
  //     "rating": {
  //         "rate": 3.9,
  //         "count": 120
  //     },
  //     "__v": 0
  // },
  const headArr = [
    "id",
    "name",
    "price",
    "category",
    "ratings Score",
    "ratings count",
    "actions",
  ];

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
    content = (
      <TableContainer mt={10} maxW="container.xl">
        <Table>
          <TableCaption>Products Table </TableCaption>
          <Thead>
            <Tr>
              {headArr.map((item) => (
                <Th key={item}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {products.products?.map((item) => (
              <Tr key={item._id}>
                <Td>{item._id}</Td>
                <Td whiteSpace={"pre-wrap"}>{item.name}</Td>
                <Td>{item.price}</Td>
                <Td>{item.category}</Td>
                <Td>{item.rating.rate}</Td>
                <Td>{item.rating.count}</Td>
                <Td>
                  <VStack spacing={2} align="left">
                    <EditProductModal itemId={item._id} />
                    <DeleteProduct itemId={item._id} />
                  </VStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>id</Th>
              <Th>name</Th>
              <Th>description</Th>
              <Th>images</Th>
              <Th>price</Th>
              <Th>category</Th>
              <Th>ratings Score</Th>
              <Th>ratings count</Th>
              <Th>actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  }

  useEffect(() => {
    doFetchProducts();
  }, [doFetchProducts]);

  return (
    <VStack
      spacing={10}
      mt={10}
      margin={"auto"}
      maxW="container.xl"
      justifySelf={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CreateProductModal mt={10} />

      <Flex
        justifySelf={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {content}
      </Flex>
    </VStack>
  );
}
