// create async Thunk to create new product
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const deleteProduct = createAsyncThunk("data/deleteProduct", async (id) => {
  const response = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + Cookies.get("jwt"),
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
});

export { deleteProduct };
