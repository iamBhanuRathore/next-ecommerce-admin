"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SetUpPage() {
  const { isOpen, onClose, onOpen } = useStoreModal();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
  return (
    <section className="p-10">
      <UserButton afterSignOutUrl="/" />
    </section>
  );
}
