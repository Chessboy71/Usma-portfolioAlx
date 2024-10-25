import prismadb from '@/lib/prismadb';
// import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const { productId, progress, name, phone, address } = body;

    if (!name) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!productId) {
      console.log('hi');
      return new NextResponse('product Id is required', { status: 400 });
    }
    if (!progress) {
      return new NextResponse('progress is required', { status: 400 });
    }
    if (!phone) {
      return new NextResponse('phone number is required', { status: 400 });
    }
    if (!address) {
      return new NextResponse('address is required', { status: 400 });
    }

    const order = await prismadb.order.create({
      data: {
        productId,
        progress,
        name,
        phone,
        address,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log('[ORDER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET() {
  try {
    const order = await prismadb.order.findMany();

    return NextResponse.json(order);
  } catch (error) {
    console.log('[CATEGORY GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
