import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { updateProduct, fetchProduct } from "../store";
import { useThunk } from "../hooks/useThunk";

const EditProductModal = ({ itemId }) => {
  const [callFlag, setCallFlag] = React.useState(false);
  const [doUpdateProduct, isLoadingUpdate, UpdateLoadingError] =
    useThunk(updateProduct);
  const [doFetchProduct, isLoadingFetch, FetchLoadingError] =
    useThunk(fetchProduct);
  const { data } = useSelector((state) => state.products);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = async () => {
    console.log(itemId);
    await doFetchProduct(itemId);
    console.log(data);
    onOpen();
  };
  const formik = useFormik({
    initialValues: {
      name: data?.product?.name || "",
      price: data?.product?.price || NaN,
      category: data?.product?.category || "",
      description: data?.product?.description || "",
      img: data?.product?.img || "",
    },
    onSubmit: async (values) => {
      console.log({ values });

      await doUpdateProduct({ id: itemId, body: values });
      console.log(data);
      setCallFlag(true);
    },
  });
  useEffect(() => {
    if (data && data.product) {
      const { name, price, category, description, img } = data.product;
      formik.setValues({
        name: name || "",
        price: price || NaN,
        category: category || "",
        description: description || "",
        img: img || "",
      });
    }
  }, [data, formik.setValues]);

  let content;
  if (isLoadingFetch) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (FetchLoadingError) {
    content = <div>Error fetching data...{FetchLoadingError}</div>;
  } else {
    content = (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Create New Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="string"
                  name="img"
                  value={formik.values.img}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoadingUpdate || isLoadingFetch}
                colorScheme="blue"
                mr={3}
                type="submit"
              >
                Update
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </form>
          {UpdateLoadingError && (
            <p>
              {UpdateLoadingError?.name + ": " + UpdateLoadingError?.message}
            </p>
          )}
          {isLoadingUpdate && <p>Loading...</p>}
          {callFlag && !UpdateLoadingError && (
            <Alert status="success" variant="solid">
              <AlertIcon />
              <AlertTitle>Product Created</AlertTitle>
            </Alert>
          )}
        </ModalContent>
      </Modal>
    );
  }
  return (
    <>
      <Button onClick={handleClick} colorScheme="blue" mt={10}>
        Update
      </Button>
      {content}
    </>
  );
};

export default EditProductModal;
