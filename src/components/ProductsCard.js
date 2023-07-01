import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    _id,
    name,
    img = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    description,
    price,
    category,
    rating,
  } = product;

  const navigate = useNavigate();
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
  return (
    <Card
      maxW={"25rem"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginTop={"1rem"}
      marginLeft={"1rem"}
      marginRight={"1rem"}
    >
      <CardBody bgColor={"#fefefe"}>
        <Image
          src={img}
          alt={name.split("-")[0]}
          borderRadius="lg"
          width={"30rem"}
          maxH={"20rem"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name.split("-")[0]}</Heading>
          <Text>{name.split("-")[1]}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${price}
          </Text>
          <Text
            name="half-rating-read"
            defaultValue={2.5}
            value={Number.parseFloat(rating)}
            precision={0.5}
            readOnly
          />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" hidden={true}>
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue" isDisabled={true}>
            Add to cart
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => navigate(`/products/${_id}`)}
          >
            View details
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
