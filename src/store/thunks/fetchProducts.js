import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const fetchProducts = createAsyncThunk("data/fetchProducts", async () => {
  const url = "http://localhost:8000/api/v1/products/";

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

export { fetchProducts };
