// config
export const UPDATE_CLIENT_DATA_MINUTE_INTERVAL = 1; // min
export const SEARCH_DEBOUNCE = 200; // millisec

// stying (should be in theme but leave it here for now)
export const ICON_SIZE = 15;

// branding
export const HOSPITAL_NAME = "Songkhla Hospital";
export const brandName = "Endo Supply";

// Use just for pagination in table
// TODO
export const CONTAINER_NUM = Number(process.env.CONTAINER_NUM as string) || 7;
// TODO: Leave like this for now since chonburi has 8 trays which will still fit in 16 trays/page
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
