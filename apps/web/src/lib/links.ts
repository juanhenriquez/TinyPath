import { auth } from "@clerk/nextjs/app-beta";
import { prisma } from "@tinypath/database";
import { cache } from "react";

type SortOption = "asc" | "desc";

/**
 * Get all links created by the user and sort them by count and created date.
 *
 * This function is using react's new cache api to cache the result, so we
 * can use it in our server components without worrying making duplicate
 * calls to the database.
 *
 */
export const getLinks = cache(
  async ({
    count,
    createdAt = "desc",
  }: {
    count?: SortOption;
    createdAt?: SortOption;
  }) => {
    const { userId } = auth();

    let orderBy = [];

    if (count) {
      orderBy.push({ count });
    }

    if (createdAt) {
      orderBy.push({ created_date: createdAt });
    }

    const data = await prisma.link.findMany({ orderBy, where: { userId } });
    return data;
  }
);
