import React from "react";
import { format } from "date-fns";

import OrderClient from "./components/OrderClient";
import { db } from "@/lib/prismadb";
import { OrdersCloumnType } from "@/typings";
import { priceFormatter } from "@/lib/utils";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          Product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!orders) null;
  const formattedOrders: OrdersCloumnType[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderitem) => orderitem.Product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, orderItem) => {
        return (total = total + Number(orderItem.Product.price));
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  // console.log({ formattedBillboard });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        Hola
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
