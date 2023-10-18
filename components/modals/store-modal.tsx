"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { storeFormSchema } from "@/lib/Validations/formSchema";

import { Modal } from "./Modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const StoreModal = () => {
  const { isOpen, onClose, onOpen } = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "Bhanu",
    },
  });
  const onSubmit = async (values: z.infer<typeof storeFormSchema>) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/stores", { ...values });
      console.log(data);
    } catch (error) {
      console.log("[StoreModal]", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create a new Store"
      description="Add a new Store manage Products"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="E-commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 flex space-x-2 items-center justify-end ">
              <Button
                disabled={loading}
                type="button"
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
