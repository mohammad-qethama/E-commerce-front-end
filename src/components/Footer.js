import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box bg="gray.200" py={4}>
      <Flex
        maxW="container.lg"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        px={4}
      >
        <Text fontSize="sm" color="gray.600">
          &copy; 2023 ChipShop. All rights reserved.
        </Text>
        <Flex>
          <Link
            as={RouterLink}
            to="/about"
            fontSize="sm"
            color="gray.600"
            mx={2}
            _hover={{ color: "blue.500" }}
          >
            About
          </Link>
          <Link
            as={RouterLink}
            to="/contact"
            fontSize="sm"
            color="gray.600"
            mx={2}
            _hover={{ color: "blue.500" }}
          >
            Contact
          </Link>
          <Link
            as={RouterLink}
            to="/privacy"
            fontSize="sm"
            color="gray.600"
            mx={2}
            _hover={{ color: "blue.500" }}
          >
            Privacy Policy
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
