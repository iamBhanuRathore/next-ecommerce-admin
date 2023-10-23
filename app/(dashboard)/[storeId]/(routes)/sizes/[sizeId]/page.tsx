import { db } from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/size-form";

const Sizepage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default Sizepage;
