import { db } from "@/lib/prismadb";
import React from "react";
import ProductForm from "./components/product-form";

const Productpage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      ProductImage: true,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
};

export default Productpage;
