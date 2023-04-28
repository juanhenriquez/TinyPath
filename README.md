# TinyPath
TinyPath is a URL shortener app that allows users to create shortened, easy-to-remember links for their long and complex URLs. 

### Tech Stack
- Turborepo
- Next.js 13 (app dir)
- Postgres & Prisma
- Radix UI & TailwindCSS
- Clerk for Authentication/Authorization.

### Set up

In order to run this project locally, you will need to use the docker-compose.yml to deploy
a local Postgres server.

```bash
docker-compose up
```

Once the database is ready, you can start the development server by running:

```bash
npm run dev
```

## Technical Approach

This project make use of the latest features of Next.js and the React world in general
with things like React Server Components and component Streaming.

### The Dashboard:

The `/dashboard` page is an example of this, as most of the UI is composed of server components.
When the `/dashboard` page starts loading, we fetch all the data it needs direcly from the server.

```tsx
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardPageSearchParams;
}) {
  // Fetch the links directly from the database based on the query params
  const links = await getLinks(searchParams);
  
  return (
    <div className="flex w-full h-full px-4 sm:px-6 py-12 max-w-4xl mx-auto items-start">
      ...
    </div>
  );
}
```

This page offers features such as data sorting and two different layouts (Table and Group) that users can choose to display the data.

Thanks to the way server components work, we didn’t need to use `useState` to manage the data display. Instead, we updated the URL with query parameters and used React’s `useTransition` to re-render the page which makes the RSC to fetch the updated data, thereby making the whole UI update seamlessly.