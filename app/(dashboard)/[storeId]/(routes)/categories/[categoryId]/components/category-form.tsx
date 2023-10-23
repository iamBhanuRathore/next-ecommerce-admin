"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Billboard, Category } from "@prisma/client";
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
import { CategoriesFormValuesType } from "@/typings";
import { categoryStoreFormSchema } from "@/lib/Validations/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();

  const form = useForm<CategoriesFormValuesType>({
    resolver: zodResolver(categoryStoreFormSchema),
    defaultValues: initialData || { name: "", billboardId: "" },
  });
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Add a new  Category";
  const toastMessage = initialData ? "Category Updated" : "Category created.";
  const action = initialData ? "Save Changes" : "Create";

  const onSubmit = async (data: CategoriesFormValuesType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.replace(`/${params.storeId}/categories`);
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
        `/api/stores${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push("/");
      toast({
        title: "Success",
        description: "You have successfully deleted the Category.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Make sure you removed all the categories using this billboard first.",
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
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
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
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm;
