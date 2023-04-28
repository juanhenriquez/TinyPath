import { nanoid } from "nanoid";

const baseUrl = process.env.BASE_URL;

export const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export function extractUrlComponents(url: string) {
  const { protocol, hostname, pathname, search } = new URL(url);
  const root = hostname;
  const path = pathname;
  const query = search;
  const scheme = protocol.replace(":", "");
  
  return { scheme, root, path, query };
};

export function getShortenedUrlComponents(url: string) {
  const components = extractUrlComponents(url);
  const { scheme, root, path, query } = components;
  const raw_shortened_path_id = nanoid(8);
  const shortened_path = `/${raw_shortened_path_id}`;
  const shortened_uri = `${baseUrl}${shortened_path}`;
  const uri = `${scheme}://${root}${path}${query}`;

  return {
    uri,
    path,
    root,
    scheme,
    shortened_uri,
    shortened_path,
    raw_shortened_path_id,
  };
};