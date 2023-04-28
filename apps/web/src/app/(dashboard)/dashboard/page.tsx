// lib
import { getLinks } from "@/lib/links";

// components
import LinksListLayout from "./LinksListLayout";
import LinksGroupLayout from "./LinksGroupLayout";
import DashboardActionsToolbar from "./DashboardActionsToolbar/DashboardActionsToolbar";

interface DashboardPageSearchParams {
  count?: "desc" | "asc";
  layout: "list" | "group";
  createdAt?: "desc" | "asc";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardPageSearchParams;
}) {
  // Get links from database.
  const links = await getLinks(searchParams);

  // Get selected layout from search params.
  const layout = searchParams.layout ?? "list";

  return (
    <div className="flex w-full h-full px-4 sm:px-6 py-12 max-w-4xl mx-auto items-start">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center justify-between w-full border-b-[0.5px] border-black/10 dark:border-white/10 pb-4">
          <div className="flex flex-col">
            <h1 className="font-semibold">Links</h1>
            <p className="text-sm text-zinc-700 dark:text-zinc-500">
              Review and manage all your links
            </p>
          </div>
          <div className="flex">
            <DashboardActionsToolbar />
          </div>
        </div>
        {links.length ? (
          <div className="mt-8">
            {layout === "list" ? (
              <LinksListLayout links={links} />
            ) : (
              <LinksGroupLayout links={links} searchParams={searchParams} />
            )}
          </div>
        ) : (
          <div className="mt-8 text-xs text-muted-foreground bg-card border-border flex justify-center items-center rounded-md border-[0.5px] border-dashed shadow-sm min-h-[80px]">
            No links found
          </div>
        )}
      </div>
    </div>
  );
}