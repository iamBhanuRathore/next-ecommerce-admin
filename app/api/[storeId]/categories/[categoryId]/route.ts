import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Any body can access this api route either they are logged in or not
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[Category_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, billboardId } = body;
    if (!name || !billboardId) {
      return new NextResponse("No Name and Billboard Id is Provided", {
        status: 401,
      });
    }
    if (!params.storeId || !params.categoryId) {
      return new NextResponse("Store Id or Billboard Id is Required", {
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
    const category = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    if (!category) {
      return new NextResponse(
        "No Billboard found for this particular Billboard Id",
        { status: 404 }
      );
    }
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[Category_Patch]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId || !params.categoryId) {
      return new NextResponse("Store Id and category Id is Required", {
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
    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[Category_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
