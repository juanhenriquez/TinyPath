import { json2csv } from "json-2-csv";
import { NextResponse } from "next/server";
import { prisma } from "@tinypath/database";

import { auth } from "@clerk/nextjs/app-beta";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }

  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  const csv = await json2csv(links);
  let response = new Response(csv);

  response.headers.set("Content-Type", "text/csv");
  response.headers.set("Content-Disposition", "attachment; filename=links.csv");

  return response;
}
