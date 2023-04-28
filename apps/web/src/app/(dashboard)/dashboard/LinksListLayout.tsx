import NextLink from "next/link";
import { Link } from "@tinypath/database";

// components
import LinksTableHeader from "./LinksTableHeader";
import { buttonVariants } from "@/components/ui/Button";

export default function LinksGroupLayout({ links }: { links: Link[] }) {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle px-4 lg:px-8">
        <div className="overflow-hidden shadow ring-[0.5px] ring-border ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y-[0.5px] divide-border">
            <LinksTableHeader />
            <tbody className="divide-y-[0.5px] divide-border bg-card">
              {links.map((link) => (
                <tr key={link.id}>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-medium text-foreground sm:pl-6">
                    {link.name || link.uri}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                    {link.count}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                    {new Date(link.created_date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NextLink
                      className={buttonVariants({
                        size: "xs",
                        variant: "ghost",
                      })}
                      href={`/links/${link.id}`}
                    >
                      Edit
                    </NextLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
