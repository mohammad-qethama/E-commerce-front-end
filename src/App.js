import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import SignupPage from "./pages/SignUpPage";
import SigninPage from "./pages/SignInpage";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import Footer from "./components/Footer";

import ProductsView from "./components/ProductsView";
import ProductDetails from "./components/ProductDetails";
import TableComponent from "./components/DashbordTable";
import { useUserName } from "./context/UserNameContext";

function App() {
  const { userInfo } = useUserName();
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/products" exact element={<ProductsView />} />
        <Route path="/products/:productId" exact element={<ProductDetails />} />
        <Route path="/signup" exact element={<SignupPage />} />
        <Route path="/signin" exact element={<SigninPage />} />
        <Route path="/about" exact element={<AboutUsPage />} />
        <Route
          path="/dashboard"
          exact
          element={
            userInfo.role === "admin" || userInfo.role === "moderator" ? (
              <TableComponent />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
