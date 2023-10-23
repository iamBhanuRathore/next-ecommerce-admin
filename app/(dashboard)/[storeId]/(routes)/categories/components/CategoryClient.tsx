"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryCloumnType } from "@/typings";
import { DataTable } from "@/components/data-table";
import ApiList from "@/components/api-list";

import { columns } from "./Columns";

interface CategoryClientProps {
  data: CategoryCloumnType[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length ?? 999})`}
          description="Manage Categories for your Store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="Name" columns={columns} data={data} />
      <Heading title="Api" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoryClient;
