class UrlResolver {
  index() {
    return "/"; //http://localhost:3000
  }

  // API
  graphql() {
    return `http://localhost:4001/graphql`;
  }
}

export const urlResolver = new UrlResolver();
