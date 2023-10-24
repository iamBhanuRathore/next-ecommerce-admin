import React from "react";
import { format } from "date-fns";

import ColorClient from "./components/ColorClient";
import { db } from "@/lib/prismadb";
import { ColorCloumnType } from "@/typings";

const Color = async ({ params }: { params: { storeId: string } }) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!colors) null;
  const formattedColors: ColorCloumnType[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  console.log({ formattedColors });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default Color;
