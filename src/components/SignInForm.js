//create sign in form and handle submission and  errors
import { useReducer } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Checkbox,
  Flex,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import reducer, { initialState } from "../reducers/signUp";
import { useUserName } from "../context/UserNameContext";

export default function SignInForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getMyInfo, userInfo } = useUserName();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (values) => {
      console.log("wat");
      dispatch({ type: "SUBMIT_START" });

      try {
        const response = await fetch("http://localhost:8000/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            credentials: "include",
          },
          body: JSON.stringify(values),
        });
        console.log(response);
        const data = await response.json();
        Cookies.set("jwt", data.token);
        await getMyInfo();

        if (data.error) {
          throw new Error(data.error);
        }
        dispatch({ type: "SUBMIT_SUCCESS" });
        console.log(state);
      } catch (err) {
        dispatch({ type: "SUBMIT_FAILURE", payload: err });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more"),
      rememberMe: Yup.boolean(),
    }),
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            And start browsing our collection of products
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={formik.errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox
                    id="rememberMe"
                    isChecked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  >
                    Remember me
                  </Checkbox>
                </Stack>
                <Button
                  isDisabled={!formik.isValid}
                  type="submit"
                  colorScheme="purple"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        {state.error && <div>{state.error.message}</div>}
        {state.success &&
          (userInfo?.role === "admin" || userInfo?.role === "moderator") && (
            <Navigate to={"/dashboard"} />
          )}
        {state.success && userInfo?.role === "user" && (
          <Navigate to={"/products"} />
        )}
      </Stack>
    </Flex>
  );
}
