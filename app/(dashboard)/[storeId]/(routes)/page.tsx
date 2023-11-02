import React from "react";
import { redirect } from "next/navigation";
import { CreditCard, DollarSign, Package } from "lucide-react";

import { db } from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderCount } from "@/action/get-order-count";
import { getTotalRevenue } from "@/action/get-total-revenue";
import { getStockCount } from "@/action/get-stock-count";
import Overview from "@/components/overview";
import { getGraphRevenue } from "@/action/get-graph-revenue";

interface DashboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  if (!store) {
    redirect("/");
  }
  const totalRevenue = await getTotalRevenue(params.storeId);
  const { paidOrderCount, paidOrderItemCount } = await getOrderCount(
    params.storeId
  );
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={`Dashboard - ${store.name}`}
          description="Overview of your Store"
        />
        <Separator />
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidOrderCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">
                Total Sold Products
              </CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidOrderItemCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">
                Product In Stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
