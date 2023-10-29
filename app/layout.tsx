import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/Modal-Provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ModalProvider />
        <Toaster />
        <NextTopLoader />
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider     = "mongodb"
//   url          = env("DATABASE_URL")
//   relationMode = "prisma"
// }

// model store {
//   id        String   @id @default(uuid()) @map("_id")
//   name      String
//   userId    String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
