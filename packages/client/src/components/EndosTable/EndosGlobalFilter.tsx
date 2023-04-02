import React from "react";
import { useAsyncDebounce } from "react-table";
import { SEARCH_DEBOUNCE } from "../../constants";
import Searchbar from "../Searchbar";

interface Props {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    data?: any;
}
export const EndosGlobalFilter = ({ filter, setFilter, data }: Props) => {
    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, SEARCH_DEBOUNCE);


    return (
        <span>
            <Searchbar
                query={filter || ""}
                onChange={(text) => {
                    setFilter(text);
                    onChange(text);
                }}
                placehodler="Input Endoscope Serial Number"
            />
        </span>
    );
};
