import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('hi');
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      images,
      price,
      quantity,
      categoryId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('images are required', { status: 400 });
    }

    if (!quantity) {
      return new NextResponse('Quantity is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Category is required', { status: 400 });
    }

    if (!images) {
      return new NextResponse('images are required', { status: 400 });
    }

    const product = await prisma?.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((image: string) => image)],
          },
        },
        quantity,
        price,
        categoryId,
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    const products = await prisma?.product.findMany({
      where: {
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCT GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
