# TinyPath

TinyPath is a URL shortener app that allows users to create shortened, easy-to-remember links for their long and complex URLs.

### Tech Stack

- Turborepo
- Next.js 13 (app dir)
- Postgres & Prisma
- Radix UI & TailwindCSS
- Clerk for Authentication/Authorization.

### Checklist
- General:
  - [x] Authentication

- Frontend:
  - [x] Dashboard page (`http://localhost:3000/dashboard`) where users can review their created links.
  - [x] Create/Update Link Dialogs with URL validation and error handling.
  - [x] Link Details page (`http://localhost:3000/links/{linkId}`) where users can see more details about the link.
  - [x] Export to CSV button to download all the links created by the user.

- Backend:
  - [x] Persistent data in Postgres.
  - [x] `GET /[linkShortenedId]` to redirect the user to the original link and update the db with the new click count.
  - [x] `GET /api/links` endpoint to return list of links for the authenticated user with pagination/sorting options available.
  - [x] `PUT /api/links/[linkId]` endpoint to update the details of a given link.
  - [x] `GET /api/download` endpoint to download a CSV of all the links generated by the authenticated user.

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

This project utilizes the most recent features of Next.js and the React ecosystem, such as React Server Components and component streaming.


---

### The Dashboard:

The `/dashboard` page is where can see the list of links generated by the user.

#### Layout Modes:

There are 2 layout modes available: Table and Group.

- **Table layout**: In the Table layout you can see all the links created by the user in paginated table. The user is allowed to sort by created date or clicks count.

![dashboard table layout](assets/dashboard-table-layout.png)

- **Group layout**: In the Group layout, links are grouped by date in a nice looking UI with Infinite Loading.
  In this layout mode there is a new "Sort" button available at the top where you can sort by Date AND Clicks count at the same time.

![dashboard group layout](assets/dashboard-group-layout.png)

Boths layouts make use of the `GET /api/links` endpoint which returns a paginated set of results
based on some query params like `take`, `page`, etc.

For demostration purposes, the **Table layout** uses a regular react-query's `useQuery` to fetch the paginated set of data,
while the **Group layout** uses `useInfiniteQuery` to demostrate the capabilities of the 2 methods of showing paginated sets of data.

#### Link Creation:

![dashboard link creation](assets/dashboard-create-button.png)


From the dashboard, users have a “Create Link” button at the top of the page. This button displays a custom dialog component with a form to create the link. 

Users can give the link an optional, easy-to-remember name.


![dashboard dialog link creation](assets/dashboard-create-dialog.png)

Once the user submits the form, we immediately update the UI by invalidating the queries responsible for retrieving the list of links.

### Link Details page:

![link details page](assets/details-page.png)


Users can go to `/links/[linkId]` page and see the details of each link they created.

Users can update the original URL of their link. This sends a `PUT` request to `/api/links/[linkId]` behind the scenes to make the change.

![link details page](assets/details-update-button.png)

Is worth mentioning that the click count only resets if the users modifies the original link. If the user only updates the name of the link, the click count will remain the same.
