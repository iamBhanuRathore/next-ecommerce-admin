import { db } from "@/lib/prismadb";

export const getOrderCount = async (id: string) => {
  // To get all the order of the current store -
  // !! I can do this but i also want the Order items number So by using I have to query database one more time
  // const paidOrderCount = await db.order.count({
  //   where: {
  //     storeId: id,
  //     isPaid: true,
  //   },
  // });
  const paidOrders = await db.order.findMany({
    where: {
      storeId: id,
      isPaid: true,
    },
    include: {
      orderItems: true,
    },
  });
  const listOfPaidOrders = paidOrders.map((paidOrder) => paidOrder.id);
  // To get all the order of the current store
  const paidOrderItemCount = await db.orderItem.count({
    where: {
      orderId: {
        in: [...listOfPaidOrders],
      },
    },
  });
  return { paidOrderCount: paidOrders.length, paidOrderItemCount };
};
