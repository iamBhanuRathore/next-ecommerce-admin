import { db } from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return <div>This is a Dashboard Page - {store.name}</div>;
};

export default DashboardPage;
