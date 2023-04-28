import { prisma } from "@tinypath/database";
import { notFound } from "next/navigation";
import BackToAllLinks from "./BackToAllLinks";

function getLink(linkId: string) {
  return prisma.link.findUnique({ where: { id: linkId } });
}

export default async function LinkPage({
  params,
}: {
  params: { linkId: string };
}) {
  const link = await getLink(params.linkId);

  if (!link) notFound();

  return (
    <div className="flex w-full h-full px-4 sm:px-6 py-12 max-w-4xl mx-auto items-start">
      <div className="flex flex-col gap-6 w-full items-start">
        <BackToAllLinks />
        <div className="w-full overflow-hidden bg-card shadow border-[0.5px] border-border rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-xs font-semibold text-foreground">
              {link.name || link.uri}
            </h3>
            <p className="max-w-2xl text-xs text-muted-foreground">
              {link.shortened_uri}
            </p>
          </div>
          <div className="border-t-[0.5px] border-border">
            <dl className="divide-y-[0.5px] divide-border">
              {link.name && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-xs font-medium text-foreground">Name</dt>
                  <dd className="mt-1 text-xs leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                    {link.name}
                  </dd>
                </div>
              )}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-medium text-foreground">
                  Original URL
                </dt>
                <dd className="mt-1 text-xs leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {link.uri}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-medium text-foreground">
                  Shortened URL
                </dt>
                <dd className="mt-1 text-xs leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {link.shortened_uri}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-medium text-foreground">Clicks</dt>
                <dd className="mt-1 text-xs leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {link.count}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-medium text-foreground">
                  Created At
                </dt>
                <dd className="mt-1 text-xs leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {new Date(link.created_date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
