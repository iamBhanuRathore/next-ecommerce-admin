import React from "react";
import { format } from "date-fns";

import BillboardClient from "./components/SizeClient";
import { db } from "@/lib/prismadb";
import { SizeCloumnType } from "@/typings";

const Size = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!sizes) null;
  const formattedSizes: SizeCloumnType[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  console.log({ formattedSizes });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Size;
