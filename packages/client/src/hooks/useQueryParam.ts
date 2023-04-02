import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const  useQueryParam = (param: string)  => {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search).get(param), [search, param]);
  }