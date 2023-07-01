import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import SignInForm from "../components/SignInForm";

export default function SignInPage() {
  return (
    <Flex height="100%">
      <Box
        flex={1}
        display={{ base: "none", md: "block" }}
        bgImage={"/31194648_7697199.svg"}
        backgroundSize={"cover"}
      >
        <Box
          position="absolute"
          top="50%"
          left="25%"
          transform="translate(-50%, -50%)"
        ></Box>
      </Box>
      <Box
        flex={1}
        display={{ base: "none", md: "block" }}
        bgBlendMode={"darken"}
      >
        <SignInForm />
      </Box>
    </Flex>
  );
}
