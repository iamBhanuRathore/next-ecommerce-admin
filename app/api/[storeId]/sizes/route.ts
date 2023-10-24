import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name || !value) {
      return new NextResponse("Name and Value Id is Required", {
        status: 400,
      });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId is Required", { status: 400 });
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
    const size = await db.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[Size_Post]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
// This route is not protected by anything anyone can access it
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is Required", { status: 400 });
    }
    const sizes = await db.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    console.log({ sizes });

    if (!sizes.length) {
      return NextResponse.json({
        success: false,
        message: "Couldn't find the specified store",
      });
    }
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[Sizes_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
