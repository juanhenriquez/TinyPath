import { prisma } from '@tinypath/database';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { linkShortenedId: string } },
) {
  if (!params.linkShortenedId) {
    return NextResponse.json(
      {
        error: 'No link shortened ID provided.',
      },
      {
        status: 400,
      },
    );
  }

  const link = await prisma.link.findUnique({
    where: {
      raw_shortened_path_id: params.linkShortenedId,
    },
  });

  if (!link) {
    return NextResponse.json({ error: 'Link not found.' }, { status: 404 });
  }

  await prisma.link.update({
    where: {
      id: link.id,
    },
    data: {
      count: link.count + 1,
    },
  });

  redirect(link.uri);
}
