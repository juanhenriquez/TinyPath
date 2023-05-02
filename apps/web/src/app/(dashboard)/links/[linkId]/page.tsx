import { notFound } from 'next/navigation';

// libs
import { getLink } from '@/lib/links';

// components
import BackToAllLinks from './BackToAllLinks';
import { ToolbarRoot } from '@/components/ui/Toolbar';
import CreateOrUpdateLinkButton from '@/components/CreateOrUpdateLinkButton';

import DeleteLinkButton from './DeleteLinkButton';

export default async function LinkPage({
  params,
}: {
  params: { linkId: string };
}) {
  const link = await getLink(params.linkId);

  if (!link) notFound();

  return (
    <div className="mx-auto flex w-full max-w-4xl items-start px-4 py-12 sm:px-6">
      <div className="flex w-full flex-col items-start gap-6">
        <BackToAllLinks />
        <div className="bg-card border-border w-full overflow-hidden rounded-lg border-[0.5px] shadow">
          <div className="flex w-full flex-col gap-2 justify-between px-4 py-6 sm:flex-row sm:px-6">
            <div className="flex flex-col">
              <h3 className="text-foreground max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold">
                {link.name || link.uri}
              </h3>
              <p className="text-muted-foreground max-w-2xl text-xs">
                {link.shortened_uri}
              </p>
            </div>
            <div>
              <ToolbarRoot className="flex gap-4">
                <DeleteLinkButton link={link} />
                <CreateOrUpdateLinkButton currentLink={link} />
              </ToolbarRoot>
            </div>
          </div>
          <div className="border-border border-t-[0.5px]">
            <dl className="divide-border divide-y-[0.5px]">
              {link.name && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-foreground text-xs font-medium">Name</dt>
                  <dd
                    className="text-muted-foreground mt-1 text-xs leading-6 sm:col-span-2 sm:mt-0"
                    data-testid="link-name-value"
                  >
                    {link.name}
                  </dd>
                </div>
              )}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-foreground text-xs font-medium">
                  Original URL
                </dt>
                <dd
                  className="text-muted-foreground mt-1 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-6 sm:col-span-2 sm:mt-0"
                  data-testid="link-uri-value"
                >
                  {link.uri}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-foreground text-xs font-medium">
                  Shortened URL
                </dt>
                <dd
                  className="text-muted-foreground mt-1 text-xs leading-6 sm:col-span-2 sm:mt-0"
                  data-testid="link-shortened-uri-value"
                >
                  {link.shortened_uri}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-foreground text-xs font-medium">Clicks</dt>
                <dd className="text-muted-foreground mt-1 text-xs leading-6 sm:col-span-2 sm:mt-0">
                  {link.count}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-foreground text-xs font-medium">
                  Created At
                </dt>
                <dd className="text-muted-foreground mt-1 text-xs leading-6 sm:col-span-2 sm:mt-0">
                  {new Date(link.created_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
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
