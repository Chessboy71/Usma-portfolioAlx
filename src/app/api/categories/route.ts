import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('billboard Id is required', { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEOGRY POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const category = await prismadb.category.findMany();

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
