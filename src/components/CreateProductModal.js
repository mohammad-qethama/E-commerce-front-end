import React from "react";
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
  AlertDescription,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { createProduct } from "../store";
import { useThunk } from "../hooks/useThunk";

const CreateProductModal = () => {
  const [callFlag, setCallFlag] = React.useState(false);
  const [doCreateProduct, isLoading, loadingError] = useThunk(createProduct);
  const { products } = useSelector((state) => state.products);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: null,
      category: "",
      description: "",
      img: "",
    },
    onSubmit: async (values) => {
      await doCreateProduct(values);
      console.log(products);
      setCallFlag(true);
    },
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" mt={10}>
        Create Product
      </Button>
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
                isLoading={isLoading}
                colorScheme="blue"
                mr={3}
                type="submit"
              >
                Create
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </form>
          {loadingError && <p>{loadingError}</p>}
          {isLoading && <p>Loading...</p>}
          {callFlag && (
            <Alert status="success" variant="solid">
              <AlertIcon />
              <AlertTitle>Product Created</AlertTitle>
            </Alert>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProductModal;
