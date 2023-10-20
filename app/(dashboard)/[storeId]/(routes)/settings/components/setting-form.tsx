"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { store } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingsFormValues } from "@/typings";
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

interface SettingFormProps {
  initialData: store;
}

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log({ hello: initialData });
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingStoreFormSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: SettingsFormValues) => {
    try {
    } catch (error) {}
    console.log(data);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        {/* {JSON.stringify(initialData)} */}
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
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
    </>
  );
};

export default SettingForm;
