import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protected = ({ setOpenCart }) => {
  const location = useLocation();
  const userData = useSelector(loggedInUserData);
  useEffect(() => {
    setOpenCart(false);
  }, [location.pathname]);
  if (!userData) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Protected;
