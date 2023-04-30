import { getLinks } from '@/lib/links';

// components
import LinkActions from './LinkActions';
import LinksTableHeader from './LinksTableHeader';

export default async function LinksTableLayout({
  searchParams,
}: {
  searchParams: any;
}) {
  const links = await getLinks(searchParams.createdAt, searchParams.count);
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full px-4 py-2 align-middle lg:px-8">
        <div className="ring-border overflow-hidden rounded-lg shadow ring-[0.5px] ring-opacity-5">
          <table className="divide-border min-w-full divide-y-[0.5px]">
            <LinksTableHeader />
            <tbody className="divide-border bg-card divide-y-[0.5px]">
              {links.map(link => (
                <tr key={link.id}>
                  <td className="text-foreground max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap py-2 pl-4 pr-3 text-xs font-medium sm:pl-6">
                    {link.name || link.uri}
                  </td>
                  <td className="text-muted-foreground whitespace-nowrap px-3 py-2 text-xs">
                    {link.count}
                  </td>
                  <td className="text-muted-foreground whitespace-nowrap px-3 py-2 text-xs">
                    {new Date(link.created_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <LinkActions link={link} />
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
