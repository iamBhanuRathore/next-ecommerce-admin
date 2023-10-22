import { db } from "@/lib/prismadb";
import React from "react";
import BillingForm from "./components/billboard-form";

const Billboardpage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillingForm initialData={billboard} />
      </div>
    </div>
  );
};

export default Billboardpage;
