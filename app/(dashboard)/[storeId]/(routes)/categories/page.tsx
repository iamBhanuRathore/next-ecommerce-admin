import React from "react";
import { format } from "date-fns";

import CategoryClient from "./components/CategoryClient";
import { db } from "@/lib/prismadb";
import { CategoryCloumnType } from "@/typings";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true, // Its same like populate function in the mongoose
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log(categories);
  if (!categories) null;
  const formattedCategories: CategoryCloumnType[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  // console.log({ formattedCategories });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
