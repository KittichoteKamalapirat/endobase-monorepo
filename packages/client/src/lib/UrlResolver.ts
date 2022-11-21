class UrlResolver {
  index() {
    return "/"; //http://localhost:3000
  }

  // API
  graphql() {
    return `http://localhost:4001/graphql`;
  }

  graphqlSocket() {
    // return `ws://192.168.1.66:4001/graphql`;
    // return `http://localhost:4000/graphql`;
    return "ws://localhost:4001/graphql";
  }
}

export const urlResolver = new UrlResolver();
