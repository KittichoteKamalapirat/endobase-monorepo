class UrlResolver {
  index() {
    return "/"; //http://localhost:3000
  }

  endos(status: string) {
    return `/?status=${status}`; //http://localhost:3000
  }

  // API
  graphql() {
    // return config.graphqlHttpEndpoint;
    return process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT as string;
  }

  graphqlSocket() {
    // return config.graphqlSocketEndpoint;
    return process.env.REACT_APP_GRAPHQL_WEB_SOCKET_ENDPOINT as string;
  }

  admin() {
    return "/nimda";
  }

  about() {
    return "/about";
  }

  adminDb() {
    return "/nimda/database";
  }

  setting() {
    return "/setting";
  }

  createOfficer() {
    return "/nimda/officer/new";
  }

  editOfficer(id: string) {
    return `/nimda/officer/${id}/edit`;
  }

  login() {
    return "/login";
  }

  landing() {
    return "/landing";
  }
}

export const urlResolver = new UrlResolver();
