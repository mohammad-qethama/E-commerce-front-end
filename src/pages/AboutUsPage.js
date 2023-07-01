import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

const AboutUsPage = () => {
  const companyName = faker.company.name();
  const companyDescription = faker.lorem.paragraphs(3);
  const companyImage = faker.image.business();

  return (
    <Box
      p={8}
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      maxW={"1024px"}
      mx={"auto"}
      height={"100vh"}
    >
      <Heading as="h1" mb={4}>
        About Us
      </Heading>
      <Box display="flex" alignItems="center" mb={4} flexDirection={"column"}>
        <Image
          src={companyImage}
          alt="Company Logo"
          boxSize={"fit-content"}
          mr={4}
        />
        <Text fontWeight="bold">{companyName}</Text>
      </Box>
      <Text mb={4}>{companyDescription}</Text>
      <Text>
        We are committed to providing high-quality products and excellent
        customer service. Our team of experts carefully selects and curates the
        finest items to meet your needs. Whether you're looking for stylish
        fashion pieces, trendy accessories, or top-notch electronics, we have
        you covered. Shop with confidence and join our growing community of
        satisfied customers.
      </Text>
    </Box>
  );
};

export default AboutUsPage;
