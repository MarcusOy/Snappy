import { DocumentNode } from "graphql";

export function getGqlString(doc: DocumentNode) {
  return doc.loc && doc.loc.source.body;
}

export const wait = (timeToDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));
