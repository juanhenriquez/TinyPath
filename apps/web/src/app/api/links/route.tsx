import { z } from 'zod';
import { NextResponse } from 'next/server';
import { prisma } from '@tinypath/database';
import { auth } from '@clerk/nextjs/app-beta';
import { getShortenedUrlComponents } from '@/lib/url';

const createUrlInputSchema = z.object({
  name: z.string().optional(),
  link: z.string().url('Invalid URL'),
});

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const body = await request.json();

  const dataValidation = createUrlInputSchema.safeParse(body);

  if (!dataValidation.success) {
    return NextResponse.json(
      { message: dataValidation.error.message },
      { status: 400 },
    );
  }

  const data = dataValidation.data;
  const urlComponents = getShortenedUrlComponents(data.link);

  if (!urlComponents) {
    return NextResponse.json({ message: 'Invalid URL' }, { status: 400 });
  }

  const existingLink = await prisma.link.findUnique({
    where: { userId_uri: { userId, uri: urlComponents.uri } },
  });

  if (existingLink) {
    return NextResponse.json(
      { message: 'This link already exists' },
      { status: 400 },
    );
  }

  const newLink = await prisma.link.create({
    data: { ...urlComponents, userId, name: data.name },
  });

  return NextResponse.json({ link: newLink });
}

const linksListInputSchema = z.object({
  page: z.coerce.number().default(1),
  take: z.coerce.number().default(15),
  countOrder: z.enum(['asc', 'desc']).optional().nullable(),
  createdAtOrder: z.enum(['asc', 'desc']).optional().nullable(),
});

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dataValidation = linksListInputSchema.safeParse({
    take: searchParams.get('take') || undefined,
    page: searchParams.get('page') || undefined,
    countOrder: searchParams.get('countOrder') || undefined,
    createdAtOrder: searchParams.get('createdAtOrder') || undefined,
  });

  if (!dataValidation.success) {
    return NextResponse.json({ error: dataValidation.error }, { status: 400 });
  }

  let orderBy = [];
  const { take, page, createdAtOrder, countOrder } = dataValidation.data;

  if (countOrder) {
    orderBy.push({ count: countOrder });
  }

  if (createdAtOrder) {
    orderBy.push({ created_date: createdAtOrder });
  }

  const links = await prisma.link.findMany({
    take,
    where: { userId },
    orderBy: orderBy.length ? orderBy : [{ created_date: 'desc' }],
    skip: (page - 1) * take,
  });

  const totalLinksCount = await prisma.link.count({
    where: { userId },
  });

  const hasMore = totalLinksCount > page * take;
  const nextPage = hasMore ? page + 1 : null;
  const previusPage = page > 1 ? page - 1 : null;

  return NextResponse.json({
    links,
    hasMore,
    nextPage,
    previusPage,
    total: totalLinksCount,
  });
}
