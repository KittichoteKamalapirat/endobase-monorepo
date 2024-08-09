// config
export const UPDATE_CLIENT_DATA_MINUTE_INTERVAL = 1; // min
export const SEARCH_DEBOUNCE = 200; // millisec

// stying (should be in theme but leave it here for now)
export const ICON_SIZE = 15;

// branding
export const HOSPITAL_NAME = "Songkhla Hospital";
export const brandName = "Endo Supply";

export const CONTAINER_NUM = 7;
export const CONTAINER_CAPACITY = 16;

// localhost
const prod = {
  // graphqlHttpEndpoint: "http://localhost:4001/graphql",
  // graphqlSocketEndpoint: "ws://localhost:4001/graphql"
  graphqlHttpEndpoint: "http://xxx.xxx.xxx.xxx:4001/graphql", // this one is not used, use in .env
  graphqlSocketEndpoint: "ws://xxx.xxx.xxx.xxx:4001/graphql",
};

const dev = {
  graphqlHttpEndpoint: "http://localhost:4001/graphql",
  graphqlSocketEndpoint: "ws://localhost:4001/graphql",
  // graphqlHttpEndpoint: "http://localhost:4001/graphql",
  // graphqlSocketEndpoint: "ws://localhost:4001/graphql"
};

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
export const config = process.env.NODE_ENV === "development" ? dev : prod;
