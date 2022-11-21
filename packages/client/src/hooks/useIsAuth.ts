import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  console.log("useIsAuth");
  const { data, loading } = useMeQuery();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if login nothing happen

    // if not log in, do this
    if (!loading && !data?.me) {
      // replace next so the user can't go back to login page
      navigate("/login", { replace: true });
    }
  }, [loading, data, navigate, location]);
};
