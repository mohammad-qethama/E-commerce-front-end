import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export * from "./thunks/fetchProducts";
export * from "./thunks/createProduct";
export * from "./thunks/updateProduct";
export * from "./thunks/deleteProduct";
export * from "./thunks/fetchProduct";
