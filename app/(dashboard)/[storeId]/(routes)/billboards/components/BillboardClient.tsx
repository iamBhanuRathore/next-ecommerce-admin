"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BillboardCloumnType } from "@/typings";
import { DataTable } from "@/components/data-table";
import ApiList from "@/components/api-list";

import { columns } from "./Columns";

interface BillboardClientProps {
  data: BillboardCloumnType[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length ?? 999})`}
          description="Manage Billboards for your Store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="Api" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardsId" />
    </>
  );
};

export default BillboardClient;
