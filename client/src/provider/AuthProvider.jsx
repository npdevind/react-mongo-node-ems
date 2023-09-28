import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { login, logout } from "../store/slices/userSlice";

const AuthProvider = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      if (!user && token) {
        setError(null);
        setLoading(true);
        try {
          const res = await fetch(process.env.APP_BASE_API + "/get-user", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          if (res.ok) {
            const data = await res.json();
            dispatch(login({ ...data, token: token }));
          } else {
            const data = await res.json();
            throw Error(data.message);
          }
        } catch (error) {
          console.log(error);
          dispatch(logout());
          setLoading(false);
          setError(error.message);
        }
      }
    })();
  }, [dispatch, user]);

  if (localStorage.getItem("token"))
    if (user) return <Outlet />;
    else if (loading) return <p>loading...</p>;
    else if (error) return <Navigate to="/login" state={{ from: location }} />;
    else return <p>loading...</p>;
  else return <Navigate to="/login" state={{ from: location }} />;
};

export default AuthProvider;
