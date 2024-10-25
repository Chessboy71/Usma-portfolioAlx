import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { ordersId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log(params.ordersId);

    const { productId, progress, name, phone, address } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!productId) {
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

    const order = await prismadb.order.update({
      where: {
        id: params.ordersId,
      },
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
    console.log('[ORDER PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ordersId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }
    if (!params.ordersId) {
      return new NextResponse('order Id is required', { status: 400 });
    }

    const order = await prismadb.order.deleteMany({
      where: {
        id: params.ordersId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log('[ORDER DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { ordersId: string } }
) {
  try {
    if (!params.ordersId) {
      return new NextResponse('order Id is required', { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.ordersId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log('[ORDER GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
