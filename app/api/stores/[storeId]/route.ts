import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("No Store Name provided", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }
    const store = await db.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[Store_Patch_Post]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }
    const store = await db.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[Store_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
