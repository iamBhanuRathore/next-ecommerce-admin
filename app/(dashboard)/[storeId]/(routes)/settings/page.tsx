import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { db } from "@/lib/prismadb";
import SettingForm from "./components/setting-form";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}
const Settings: React.FC<SettingPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-5 p-8">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
