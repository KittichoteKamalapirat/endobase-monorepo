export const brandName = "Endo Supply";
export const UPDATE_STORAGE_TIME_INTERVAL = 1; // min
export const UPDATE_CONTAINER_STATS_TIME_INTERVAL = 1; // min
export const SEARCH_DEBOUNCE = 200; // millisec
export const ICON_SIZE = 15;

export const HUMIDITY_THRESHOLD = 35;

const prod = {
    graphqlHttpEndpoint: "http://172.23.240.1:4001/graphql",
    graphqlSocketEndpoint: "ws://172.23.240.1:4001/graphql"
}

const dev = {
    graphqlHttpEndpoint: "http://localhost:4001/graphql",
    graphqlSocketEndpoint: "ws://localhost:4001/graphql"
}




export const config = process.env.NODE_ENV === "development" ? dev : prod;