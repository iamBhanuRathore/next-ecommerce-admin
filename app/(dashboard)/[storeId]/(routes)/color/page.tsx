import React from "react";
import { format } from "date-fns";

import BillboardClient from "./components/BillboardClient";
import { db } from "@/lib/prismadb";
import { BillboardCloumnType } from "@/typings";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!billboards) null;
  const formattedBillboard: BillboardCloumnType[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  console.log({ formattedBillboard });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default Billboards;
