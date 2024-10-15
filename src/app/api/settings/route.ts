import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { heroPicture, featuredImage } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }

    if (!heroPicture) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!featuredImage) {
      return new NextResponse('Price is required', { status: 400 });
    }

    const product = await prismadb.settings.create({
      data: {
        heroPicture,
        featuredImage,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[SETTINGS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET() {
  try {
    const settings = await prismadb.settings.findMany();

    return NextResponse.json(settings);
  } catch (error) {
    console.log('[PRODUCT GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
