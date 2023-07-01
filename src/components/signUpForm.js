import { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import reducer, { initialState } from "../reducers/signUp";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";

export default function SignUpForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      dispatch({ type: "SUBMIT_START" });
      try {
        const response = await fetch("http://localhost:8000/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(values),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status >= 400 && response.status < 600) {
          // Handle server error response
          if (data.error.startsWith("E11000")) {
            data.error = " Error (409)  : User already exists";
          }
          throw new Error(data.error);
        }

        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "SUBMIT_FAILURE", payload: error });
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
  });
  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <VStack spacing={8} alignItems="flex-start" width="100%">
        <form onSubmit={formik.handleSubmit}>
          <Heading fontSize={"2xl"}>Sign Up Now!</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Create your account to start shopping 😎
          </Text>
          <FormControl isInvalid={formik.touched.name && formik.errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="name"
              {...formik.getFieldProps("name")}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              name="email"
              type="text"
              id="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              name="password"
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            <FormErrorMessage> {formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          >
            <FormLabel htmlFor="passwordConfirm">
              Confirm Your Password
            </FormLabel>
            <Input
              name="passwordConfirm"
              type="password"
              id="passwordConfirm"
              {...formik.getFieldProps("passwordConfirm")}
            />

            <FormErrorMessage>
              {" "}
              {formik.errors.passwordConfirm}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="purple"
            mt={4}
            width="full"
            disabled={formik.isValid}
            isLoading={state.loading}
          >
            Submit
          </Button>
          {state.error && <div>{state.error.message}</div>}
          {state.success && <div>Sign-up successful!</div>}
        </form>
      </VStack>
    </Flex>
  );
}
// name
// email
// password
//confirm password
// s
