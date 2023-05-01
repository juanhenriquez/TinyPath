import 'server-only';

import { cache } from 'react';
import { auth } from '@clerk/nextjs/app-beta';
import { prisma } from '@tinypath/database';

/**
 * Get a link given the link id.
 *
 * This function is using react's new cache api to cache the result, so we
 * can use it in our server components without worrying making duplicate
 * calls to the database.
 *
 */
export const getLink = cache(async (linkId: string) => {
  const { userId } = auth();
  const link = await prisma.link.findUnique({ where: { id: linkId } });
  if (link?.userId !== userId) {
    throw new Error("You don't have permission to access this link");
  }
  return link;
});
