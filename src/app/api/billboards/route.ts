import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('hi');
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('image is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET() {
  try {
    const billboards = await prismadb.billboard.findMany();

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARD GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
