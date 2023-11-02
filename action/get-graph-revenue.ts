import { db } from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (id: string) => {
  // ?? What it will find -- All the orders of a particular store Orders -- Multiple OrderItem
  const paidOrders = await db.order.findMany({
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

  const monthlyRevenue: { [key: number]: number } = {};
  for (const order of paidOrders) {
    let month = order.createdAt.getMonth();
    // Single order Revenue --  singleOrderTotal
    let singleOrderTotal = 0;
    for (const item of order.orderItems) {
      singleOrderTotal = singleOrderTotal + item.Product.price;
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + singleOrderTotal;
  }
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];
  for (const month in monthlyRevenue) {
    graphData[month].total = monthlyRevenue[month];
  }
  return graphData;
};
