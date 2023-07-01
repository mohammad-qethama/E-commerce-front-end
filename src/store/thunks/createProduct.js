// create async Thunk to create new product
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const createProduct = createAsyncThunk("data/createProduct", async (body) => {
  const response = await fetch("http://localhost:8000/api/v1/products/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Cookies.get("jwt"),
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
});

export { createProduct };
