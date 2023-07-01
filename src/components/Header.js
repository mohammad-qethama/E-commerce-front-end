import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Button, Heading, Text } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUserName } from "../context/UserNameContext";
import Cookies from "js-cookie";

const Header = () => {
  const { userInfo } = useUserName();
  const navigate = useNavigate();
  const handleSignOut = () => {
    Cookies.remove("jwt");
    window.location.reload();
  };
  return (
    <Box
      bg="gray.800"
      color="white"
      py={4}
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex maxW="container.xl" mx="auto" px={4}>
        <Box>
          <Link to="/">
            <Heading as="h1" fontSize="xl">
              ChopShop
            </Heading>
          </Link>
          <Text fontSize="sm">The Best Place for Your Chopping Needs</Text>
        </Box>
        <Spacer />
        <Flex alignItems="center">
          {(userInfo.role === "admin" || userInfo.role === "moderator") && (
            <Link to="/dashboard">
              <Button variant="outline" mr={2}>
                Dashboard
              </Button>
            </Link>
          )}
          <Link to="/products">
            <Button variant="outline" mr={2}>
              Products
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" mr={2}>
              About Us
            </Button>
          </Link>

          {!userInfo?.name && (
            <Link to="/signup">
              <Button colorScheme="blue" mr={2}>
                Sign Up
              </Button>
            </Link>
          )}
          {!userInfo?.name && (
            <Link to="/signin">
              <Button colorScheme="blue">Sign In</Button>
            </Link>
          )}
          {userInfo?.name && (
            <Button mr={2} colorScheme={"red"} onClick={handleSignOut}>
              Sign Out
            </Button>
          )}

          {userInfo?.name && (
            <Text mr={2} as="u">
              {userInfo.name}
            </Text>
          )}
          {userInfo?.name && (
            <Button mr={2} onClick={() => navigate("mycart")}>
              <AiOutlineShoppingCart />
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
