import React, { useState, useEffect } from "react";
import { useAsyncDebounce } from "react-table";
import { SEARCH_DEBOUNCE } from "../../constants";
import Searchbar from "../Searchbar";

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
}
export const GlobalFilter = ({ filter, setFilter, data }: Props) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, SEARCH_DEBOUNCE);

  useEffect(() => {
    console.log("set filter");
    if (data) setFilter(value);
    else setFilter(value);
  }, [value, setFilter, data]);
  return (
    <span>
      <Searchbar
        query={value || ""}
        onChange={(text) => {
          setValue(text);
          onChange(text);
        }}
        placehodler="Input Endoscope Serial Number"
      />
    </span>
  );
};
