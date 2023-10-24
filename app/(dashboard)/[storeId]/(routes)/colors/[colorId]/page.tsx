import { db } from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/color-form";

const Colorpage = async ({ params }: { params: { colorId: string } }) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default Colorpage;
