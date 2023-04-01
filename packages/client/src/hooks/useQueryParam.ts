import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const  useQueryParam = (param: string)  => {
    const { search } = useLocation();

    console.log('seearch', search)

    console.log('change')
  
    return useMemo(() => new URLSearchParams(search).get(param), [search, param]);
  }