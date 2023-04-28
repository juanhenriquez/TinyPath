import NextLink from "next/link";
import { Link } from "@tinypath/database";

// components
import { buttonVariants } from "@/components/ui/Button";

interface LinksListLayoutProps {
  links: Link[];
  searchParams: {
    count?: "desc" | "asc";
    createdAt?: "desc" | "asc";
  };
}

export default function LinksListLayout({
  links,
  searchParams,
}: LinksListLayoutProps) {
  // Group links by date by creating an object with the date as
  // the key and an array of links as the value.
  const linksGroupedByDate = links.length
    ? links.reduce<{
        [key: string]: (typeof links)[0][];
      }>((prev, link) => {
        const date = new Date(link.created_date).toLocaleDateString();

        if (!prev[date]) {
          prev[date] = [];
        }

        prev[date]?.push(link);

        return prev;
      }, {})
    : {};

  return (
    <div className="flex flex-col gap-8">
      {Object.keys(linksGroupedByDate)
        .sort((a, b) => {
          if (searchParams.createdAt === "asc") {
            return new Date(a).getTime() - new Date(b).getTime();
          } else {
            return new Date(b).getTime() - new Date(a).getTime();
          }
        })
        .map((date) => {
          const currentLinks = linksGroupedByDate[date];
          return (
            <div key={date} className="flex flex-col gap-2">
              <div className="text-xs text-zinc-700 dark:text-zinc-500 font-medium">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="bg-card border-border flex flex-col overflow-hidden rounded-md border-[0.5px] shadow-sm">
                {currentLinks
                  .sort((a, b) => {
                    if (searchParams.count === "asc") {
                      return a.count - b.count;
                    } else {
                      return b.count - a.count;
                    }
                  })
                  .map((link) => (
                    <div
                      className="border-border h-[44px] grid grid-cols-[160px,1fr,fit-content(100%)] items-center gap-3 border-b px-4 last:border-b-0 justify-between"
                      key={link.id}
                    >
                      <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {link.name || link.uri}
                      </div>
                      <div className="text-xs items-center border-l border-border pl-3">
                        {link.count}{" "}
                        <span className="text-muted-foreground">Clicks</span>
                      </div>
                      <NextLink
                        className={buttonVariants({
                          size: "xs",
                          variant: "ghost",
                        })}
                        href={`/links/${link.id}`}
                      >
                        Edit
                      </NextLink>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
