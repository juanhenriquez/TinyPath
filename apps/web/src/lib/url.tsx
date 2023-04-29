import 'server-only';
import { nanoid } from 'nanoid';
import { env } from '@/config/env/server';

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
  const shortened_uri = `${env.baseUrl}${shortened_path}`;
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
