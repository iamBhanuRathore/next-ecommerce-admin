import { db } from "@/lib/prismadb";

export const getStockCount = async (id: string) => {
  const availableProducts = await db.product.count({
    where: {
      storeId: id,
      isArchived: false,
    },
  });
  return availableProducts;
};
