import { z } from 'zod';
import { NextResponse } from 'next/server';
import { prisma } from '@tinypath/database';
import { auth } from '@clerk/nextjs/app-beta';
import { getShortenedUrlComponents } from '@/lib/url';

const createUrlInputSchema = z.object({
  name: z.string().optional(),
  link: z.string().url('Invalid URL'),
});

export async function PUT(
  request: Request,
  { params: { linkId } }: { params: { linkId: string } },
) {
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

  const existingLink = await prisma.link.findUnique({
    where: { id: linkId },
  });

  if (!existingLink) {
    return NextResponse.json(
      { message: 'This link does not exist' },
      { status: 400 },
    );
  }

  const data = dataValidation.data;
  const updatedUrlComponents = getShortenedUrlComponents(
    data.link,
    existingLink.raw_shortened_path_id,
  );
  const updatedLink = await prisma.link.update({
    where: { id: existingLink.id },
    data: {
      ...existingLink,
      ...updatedUrlComponents,
      ...(data.name && { name: data.name }),

      // Reset the count if the original URI has changed
      count: existingLink.uri === updatedUrlComponents.uri ? existingLink.count : 0,
    },
  });

  return NextResponse.json({ link: updatedLink });
}
