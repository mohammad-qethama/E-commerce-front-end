import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ProductsView from "../components/ProductsView";

const HomePage = () => {
  let navigate = useNavigate();
  return (
    <Box bg="gray.100" minHeight="100vh" paddingY={10}>
      <Box bg="blue.500" height="400px" position="relative">
        <Box
          backgroundImage="url('https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg')"
          backgroundSize="cover"
          backgroundPosition="center"
          height="100%"
          opacity={0.6}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
        >
          <Heading as="h1" fontSize="6xl" mb={6}>
            Welcome to ChipShop
          </Heading>
          <Text fontSize="xl" fontWeight="bold">
            Shop the latest fashion ,gadgets and accessories.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            mt={8}
            onClick={() => navigate("/products")}
          >
            Explore Now
          </Button>
        </Box>
      </Box>

      <Box maxW="container.lg" mx="auto" paddingX={4} paddingTop={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading as="h2" fontSize="3xl">
            Featured Products
          </Heading>
          <Button variant="link" onClick={() => navigate("/products")}>
            View All
          </Button>
        </Flex>
        <ProductsView limit={4} width="100%" height="100%" />
        {/* Product cards or grid goes here */}
        <Flex justifyContent="center" mt={12}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate("/signin")}
          >
            Shop Now
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
export default HomePage;
