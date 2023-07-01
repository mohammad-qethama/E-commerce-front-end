import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useThunk } from "../hooks/useThunk";
import { fetchProduct } from "../store";
export default function Simple() {
  const { productId } = useParams();
  const [doFetchProduct, isLoadingFetch, FetchLoadingError] =
    useThunk(fetchProduct);
  const { data } = useSelector((state) => state.products);

  const colorText = useColorModeValue("gray.900", "gray.400");
  const bColorSD = useColorModeValue("gray.200", "gray.600");
  const colorTextDetails = useColorModeValue("gray.500", "gray.400");
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
    content = (
      <div>{"Error fetching data..." + FetchLoadingError?.message}</div>
    );
  } else {
    content = (
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                data?.product?.img ||
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              fit={"max"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "100%" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {data?.product?.name || "404: NOT FOUND"}
              </Heading>
              <Text color={colorText} fontWeight={300} fontSize={"2xl"}>
                {data?.product?.price || "404: NOT FOUND"}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={bColorSD} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={colorTextDetails}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {data?.product?.name || "404: NOT FOUND"}
                </Text>
                <Text fontSize={"lg"}>
                  {data?.product?.description || "404: NOT FOUND"}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Cool </ListItem>
                    <ListItem>New </ListItem> <ListItem>Feasible</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Colorful</ListItem>
                    <ListItem>Trendy</ListItem>
                    <ListItem>High Quality</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.300"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      size:
                    </Text>{" "}
                    fit
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Bracelet:
                    </Text>{" "}
                    leather strap
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Case:
                    </Text>{" "}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Case diameter:
                    </Text>{" "}
                    42 mm
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Dial color:
                    </Text>{" "}
                    Black
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Crystal:
                    </Text>{" "}
                    Domed, scratch‑resistant sapphire crystal with
                    anti‑reflective treatment inside
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Water resistance:
                    </Text>{" "}
                    5 bar (50 metres / 167 feet){" "}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"gray.900"}
              color={"white"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }

  useEffect(() => {
    doFetchProduct(productId);
  }, [doFetchProduct, productId]);

  return <div>{content}</div>;
}
