import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds } = await req.json();
    // return new NextResponse("Heloo", { status: 200 });
    if (!productIds || productIds.length < 1) {
      return new NextResponse("ProductIds are required", { status: 400 });
    }
    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      });
    });

    console.log("till here");

    const order = await db.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            Product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });
    console.log({ order });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.AFTER_SUCCESS_URL}/cart?success=1`,
      cancel_url: `${process.env.AFTER_SUCCESS_URL}/cart?cancelled=1`,
      metadata: {
        orderId: order.id,
      },
    });
    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { massage: "Some error occured", error },
      { status: 400 }
    );
  }
}
