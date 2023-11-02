import { db } from "@/lib/prismadb";

export const getTotalRevenue = async (id: string) => {
  // To find all the order for that particular store - which or of this store and the status of isPaid is true
  const paidOrder = await db.order.findMany({
    where: {
      storeId: id,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          Product: true,
        },
      },
    },
  });
  // Adding the total of the Orders in which a single order can have multiple product price which are paid
  const revenue = paidOrder.reduce((total, singleOrder) => {
    // Finding the total of single order ---
    const orderTotal = singleOrder.orderItems.reduce((total, orderItem) => {
      return (total = total + orderItem.Product.price);
    }, 0);
    total = total + orderTotal;
    return total;
  }, 0);
  return revenue;
};
