import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Portal,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { deleteProduct } from "../store";
import { useThunk } from "../hooks/useThunk";
const DeleteProduct = ({ itemId }) => {
  const [doDeleteProduct, isLoading, loadingError] = useThunk(deleteProduct);
  const { data } = useSelector((state) => state.products);

  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleClick = async () => {
    await doDeleteProduct(itemId);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button mr={5} onClick={onToggle} colorScheme="red">
            Delete
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Delete Product</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              Are you sure you want to continue with your action?
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button
                  variant="outline"
                  onClick={onClose}
                  isLoading={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleClick}
                  isLoading={isLoading}
                  isDisabled={data?.status === "success"}
                >
                  Confirm
                </Button>
              </ButtonGroup>
              {loadingError && <p>{loadingError?.message}</p>}
              {data?.status === "success" && <p>Deleted Successfully </p>}
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default DeleteProduct;
