import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const fetchProduct = createAsyncThunk("data/fetchProduct", async (id) => {
  console.log({ id });
  let url;
  if (id) url = `http://localhost:8000/api/v1/products/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("jwt"),
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();

  return data;
});

export { fetchProduct };
