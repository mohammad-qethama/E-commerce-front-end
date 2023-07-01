import { Box, Flex, Image } from "@chakra-ui/react";
import SignUpForm from "../components/signUpForm";

export default function SignUpPage() {
  return (
    <Flex height="100%">
      <Box flex={1} display={{ base: "none", md: "block" }}>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1511317559916-56d5ddb62563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=693&q=80"
          height="100%"
          width="100%"
        />
      </Box>
      <Flex justifyContent="center" alignItems="center" flex={1}>
        <Box
          p={6}
          rounded="md"
          w="xl"
          maxWidth="1024px"
          border="4px"
          borderColor="gray.200"
          shadow="md"
        >
          <SignUpForm />
        </Box>
      </Flex>
    </Flex>
  );
}
