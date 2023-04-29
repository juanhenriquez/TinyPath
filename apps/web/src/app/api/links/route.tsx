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
