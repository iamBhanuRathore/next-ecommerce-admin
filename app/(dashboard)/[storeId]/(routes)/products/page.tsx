import React from "react";
import { format } from "date-fns";

import ProductClient from "./components/ProductClient";
import { db } from "@/lib/prismadb";
import { ProductCloumnType } from "@/typings";
import { priceFormatter } from "@/lib/utils";

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      Category: true,
      Color: true,
      Size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!products) null;
  const formattedProducts: ProductCloumnType[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: priceFormatter.format(item.price),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.Category.name,
    size: item.Size.name,
    color: item.Color.value,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  console.log({ formattedProducts });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
