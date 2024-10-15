import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { settingsId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { heroPicture, featuredImage } = body;

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }
    if (!heroPicture) {
      return new NextResponse('heroPicture is required', { status: 400 });
    }
    if (!featuredImage) {
      return new NextResponse('featuredImage is required', { status: 400 });
    }

    if (!params.settingsId) {
      return new NextResponse('Settings is required', { status: 400 });
    }

    const settings = await prismadb.settings.update({
      where: {
        id: params.settingsId,
      },
      data: {
        heroPicture,
        featuredImage,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.log('[SETTINGS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { settingsId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthicated', { status: 401 });
    }
    if (!params.settingsId) {
      return new NextResponse('product is required', { status: 400 });
    }

    const settings = await prismadb.settings.deleteMany({
      where: {
        id: params.settingsId,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { settingsId: string } }
) {
  try {
    if (!params.settingsId) {
      return new NextResponse('settings id is required', { status: 400 });
    }

    const settings = await prismadb.settings.findUnique({
      where: {
        id: params.settingsId,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.log('[SETTINGS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
