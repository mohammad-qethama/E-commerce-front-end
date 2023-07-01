import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

const UserNameContext = createContext();

export const UserNameProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });
  const getMyInfo = async () => {
    const token = Cookies.get("jwt");
    const response = await fetch("http://localhost:8000/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUserInfo({
      ...userInfo,
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
  };
  return (
    <UserNameContext.Provider value={{ userInfo, setUserInfo, getMyInfo }}>
      {props.children}
    </UserNameContext.Provider>
  );
};

export default UserNameContext;

export const useUserName = () => {
  return useContext(UserNameContext);
};
