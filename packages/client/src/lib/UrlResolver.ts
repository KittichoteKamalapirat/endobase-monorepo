import { config } from "../constants";

class UrlResolver {
  index() {
    return "/"; //http://localhost:3000
  }

  // API
  graphql() {
    return config.graphqlHttpEndpoint;
  }

  graphqlSocket() {
    // return `ws://192.168.1.66:4001/graphql`;
    // return `http://localhost:4000/graphql`;
    return config.graphqlSocketEndpoint;
  }

  admin() {
    return "/nimda";
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
}

export const urlResolver = new UrlResolver();
