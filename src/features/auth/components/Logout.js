import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserData, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const user = useSelector(loggedInUserData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutAsync(user.id));
  }, []);
  return <>{!user && <Navigate to="/login" replace={true} />}</>;
}
export default Logout;
