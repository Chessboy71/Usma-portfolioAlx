import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
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

    if (!params.productId) {
      return new NextResponse('prodcut is required', { status: 400 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        images: {
          deleteMany: {},
        },
        quantity,
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }
    if (!params.productId) {
      return new NextResponse('product is required', { status: 400 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
