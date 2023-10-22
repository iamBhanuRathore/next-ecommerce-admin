import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Any body can access this api route either they are logged in or not
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboard = await db.billboard.findMany({
      where: {
        id: params.billboardId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[Billboard_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!label || !imageUrl) {
      return new NextResponse("No label and ImageUrl is ProvidedS", {
        status: 401,
      });
    }
    if (!params.storeId || !params.billboardId) {
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
    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    if (!billboard) {
      return new NextResponse(
        "No Billboard found for this particular Billboard Id",
        { status: 404 }
      );
    }
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[Store_Patch_Post]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId || !params.billboardId) {
      return new NextResponse("Store Id and Billboard Id is Required", {
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
    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    // We have not used New Keyword because we are using the json method
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[Billboard_Delete]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
