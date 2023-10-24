"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { ColorsFormValuesType } from "@/typings";
import { colorStoreFormSchema } from "@/lib/Validations/formSchema";

interface ColorFormProps {
  initialData: Color | null;
}

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();

  const form = useForm<ColorsFormValuesType>({
    resolver: zodResolver(colorStoreFormSchema),
    defaultValues: initialData || { name: "", value: "" },
  });
  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData ? "Edit a Color" : "Add a new  Color";
  const toastMessage = initialData ? "Color Updated" : "Color created.";
  const action = initialData ? "Save Changes" : "Create";

  const onSubmit = async (data: ColorsFormValuesType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.replace(`/${params.storeId}/colors`);
      toast({
        title: "Success",
        variant: "default",
        description: toastMessage,
      });
    } catch (error) {
      toast({
        title: "Failed",
        variant: "destructive",
        // description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores${params.storeId}/colors/${params.colorId}`
      );
      router.refresh();
      router.replace(`/${params.storeId}/colors`);
      toast({
        title: "Success",
        description: "You have successfully deleted the Color.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Make sure you removed all the products using this color first.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between pb-2">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full p-5">
          <div className="md:grid grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Hex Code #CCC"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-fit ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ColorForm;
