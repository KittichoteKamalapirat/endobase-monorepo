// config
export const UPDATE_CLIENT_DATA_MINUTE_INTERVAL = 0.25; // min
export const SEARCH_DEBOUNCE = 200; // millisec

// stying (should be in theme but leave it here for now)
export const ICON_SIZE = 15;

// branding
export const HOSPITAL_NAME = "Songkhla Hospital"
export const brandName = "Endo Supply";


// 192.168.1.200
const prod = {
    graphqlHttpEndpoint: "http://192.168.1.200:4001/graphql",
    graphqlSocketEndpoint: "ws://192.168.1.200:4001/graphql"
}

const dev = {
    graphqlHttpEndpoint: "http://192.168.1.200:4001/graphql",
    graphqlSocketEndpoint: "ws://192.168.1.200:4001/graphql"
    // graphqlHttpEndpoint: "http://localhost:4001/graphql",
    // graphqlSocketEndpoint: "ws://localhost:4001/graphql"
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;