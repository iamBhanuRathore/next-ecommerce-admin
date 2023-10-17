"use client";
import { Modal } from "@/components/Modal";
import { UserButton } from "@clerk/nextjs";

export default function SetUpPage() {
  return (
    <section className="p-10">
      <UserButton afterSignOutUrl="/" />
      <Modal
        isOpen
        onClose={() => {}}
        title="Test"
        description="Test Description"
      >
        Children
      </Modal>
    </section>
  );
}
