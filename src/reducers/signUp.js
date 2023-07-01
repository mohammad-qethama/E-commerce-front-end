const initialState = {
  loading: false,
  error: null,
  success: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_START":
      return { ...state, loading: true, error: null, success: false };
    case "SUBMIT_SUCCESS":
      return { ...state, loading: false, success: true };
    case "SUBMIT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export { initialState };
export default reducer;
