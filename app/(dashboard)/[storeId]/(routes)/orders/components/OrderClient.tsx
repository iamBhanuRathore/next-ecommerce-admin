"use client";
import React from "react";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { OrdersCloumnType } from "@/typings";
import { DataTable } from "@/components/data-table";

import { columns } from "./Columns";

interface OrderClientProps {
  data: OrdersCloumnType[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Order (${data.length ?? 999})`}
        description="Manage Orders for your Store"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
