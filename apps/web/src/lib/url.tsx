import { nanoid } from 'nanoid';

const PREVIEW_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;

const baseUrl = process.env.BASE_URL || PREVIEW_URL || 'http://localhost:3000';

export const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export function extractUrlComponents(url: string) {
  const { protocol, hostname, pathname, search } = new URL(url);
  const root = hostname;
  const path = pathname;
  const query = search;
  const scheme = protocol.replace(':', '');

  return { scheme, root, path, query };
}

export function getShortenedUrlComponents(url: string, pathId?: string) {
  const components = extractUrlComponents(url);
  const { scheme, root, path, query } = components;
  const raw_shortened_path_id = pathId || nanoid(8);
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
}
