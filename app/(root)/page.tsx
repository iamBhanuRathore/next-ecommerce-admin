"use client";
import { Modal } from "@/components/modals/Modal";
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
  return (
    <section className="p-10">
      <UserButton afterSignOutUrl="/" />
    </section>
  );
}
