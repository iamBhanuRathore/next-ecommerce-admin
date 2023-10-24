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
      return new NextResponse("Name and Color Id is Required", {
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
    const color = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[Color_Post]", error);
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
    const colors = await db.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    console.log({ colors });

    if (!colors.length) {
      return NextResponse.json({
        success: false,
        message: "Couldn't find the specified store",
      });
    }
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[Colors_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
