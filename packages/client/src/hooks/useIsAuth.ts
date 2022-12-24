import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const { data, loading, error } = useMeQuery();

  const navigate = useNavigate();
  const location = useLocation();

  console.log('me data', data?.me?.username)
  console.log('loading', loading)
  console.log('errpr', error)

  useEffect(() => {
    // if login nothing happen

    // if not log in, do this
    if (!loading && !data?.me) {
      // replace next so the user can't go back to login page
      navigate("/login", { replace: true });
    }
  }, [loading, data, navigate, location]);
};
