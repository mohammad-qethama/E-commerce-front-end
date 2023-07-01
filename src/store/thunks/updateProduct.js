import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const updateProduct = createAsyncThunk(
  "data/updateProduct",
  async ({ id, body }) => {
    console.log(Cookies.get("jwt"));
    const url = `http://localhost:8000/api/v1/products/${id}`;
    console.log("inside updateProduct thunk");
    console.log(body);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + Cookies.get("jwt"),
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (response.status === 404) {
      throw new Error("Not Found");
    }
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    const data = await response.json();
    return data;
  }
);

export { updateProduct };
