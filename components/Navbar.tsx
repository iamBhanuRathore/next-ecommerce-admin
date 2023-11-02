import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/prismadb";

import MainNav from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <nav className="flex border-b h-16 items-center p-4">
      <StoreSwitcher items={stores} />
      <MainNav className="mx-6" />
      {/* User Button */}
      <div className="ml-auto flex items-center space-x-6">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
