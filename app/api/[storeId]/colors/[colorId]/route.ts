import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Any body can access this api route either they are logged in or not
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const color = await db.color.findMany({
      where: {
        id: params.colorId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[Color_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!name || !value) {
      return new NextResponse("No Name and Color Id is Provided", {
        status: 401,
      });
    }
    if (!params.storeId || !params.colorId) {
      return new NextResponse("Store Id or color Id is Required", {
        status: 400,
      });
    }
    // To check if it is the color of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const color = await db.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    if (!color) {
      return new NextResponse("No color found for this particular color Id", {
        status: 404,
      });
    }
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[Color_Patch]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId || !params.colorId) {
      return new NextResponse("Store Id and color Id is Required", {
        status: 400,
      });
    }
    // To check if it is the color of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const color = await db.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[Color_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
