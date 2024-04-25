import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedAdmin = ({ setOpenCart }) => {
  const location = useLocation();
  const userData = useSelector(loggedInUserData);
  useEffect(() => {
    setOpenCart(false);
  }, [location.pathname]);
  if (!userData) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (userData && userData.role !== "admin") {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedAdmin;
