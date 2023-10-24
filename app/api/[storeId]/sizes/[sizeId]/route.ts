import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Any body can access this api route either they are logged in or not
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const size = await db.size.findMany({
      where: {
        id: params.sizeId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[Size_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!name || !value) {
      return new NextResponse("No Name and Size Id is Provided", {
        status: 401,
      });
    }
    if (!params.storeId || !params.sizeId) {
      return new NextResponse("Store Id or Size Id is Required", {
        status: 400,
      });
    }
    // To check if it is the Size of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });
    if (!size) {
      return new NextResponse("No Size found for this particular Size Id", {
        status: 404,
      });
    }
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[Size_Patch]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId || !params.sizeId) {
      return new NextResponse("Store Id and Size Id is Required", {
        status: 400,
      });
    }
    // To check if it is the Size of the user who is logged in ?.
    const isAuthorized = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const size = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[Size_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
