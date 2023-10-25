import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Any body can access this api route either they are logged in or not
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        Category: true,
        Color: true,
        images: true,
        Size: true,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[Product_Get]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;
    if (!name || !price || !categoryId || !sizeId || !colorId) {
      return new NextResponse("No label and ImageUrl is ProvidedS", {
        status: 401,
      });
    }
    if (!params.storeId || !params.productId) {
      return new NextResponse("Store Id or Product Id is Required", {
        status: 400,
      });
    }
    // To check if it is the Product of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });
    const product = await db.product.update({
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
    if (!product) {
      return new NextResponse(
        "No Product found for this particular Product Id",
        { status: 404 }
      );
    }
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[Product_Patch]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId || !params.productId) {
      return new NextResponse("Store Id and Product Id is Required", {
        status: 400,
      });
    }
    // To check if it is the Billboard of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[Product_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
