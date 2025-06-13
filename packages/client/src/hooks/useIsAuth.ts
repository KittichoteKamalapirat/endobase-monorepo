import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if login nothing happen

    // if not log in, do this
    if (!loading && !data?.me) {
      // replace next so the user can't go back to login page
      if (process.env.REACT_APP_ENVIRONMENT !== "showcase")
        navigate(urlResolver.login(), { replace: true });
      else navigate(urlResolver.landing(), { replace: true });
    }
  }, [loading, data, navigate, location]);
};
