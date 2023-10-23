"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { store } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingsFormValuesType } from "@/typings";
import { settingStoreFormSchema } from "@/lib/Validations/formSchema";
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
import { ApiAlert } from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
  initialData: store;
}

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const origin = useOrigin();
  const router = useRouter();

  const form = useForm<SettingsFormValuesType>({
    resolver: zodResolver(settingStoreFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValuesType) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${initialData.id}`, data);
      router.refresh();
      toast({
        title: "Success",
        variant: "default",
        description: "Successfully Updated the store",
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
      await axios.delete(`/api/stores/${initialData.id}`);
      router.refresh();
      router.push("/");
      toast({
        title: "Success",
        description: "You have successfully deleted the Store.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Make sure you removed all the products and Categories First.",
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
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full p-5"
        >
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
                      placeholder="Change Your store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-fit ml-auto">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${initialData.id}`}
        variant="public"
      />
    </>
  );
};

export default SettingForm;
