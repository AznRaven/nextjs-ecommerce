import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { priceInCents: true },
    _count: true,
  });
  await wait(2000)
  return {
    amount: (data._sum.priceInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

function wait(duration){
    return new Promise(resolve => setTimeout(resolve, duration))
}

async function getUserData(){
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {priceInCents: true}
        })
    ])
    return{
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.priceInCents || 0) / userCount / 100
    }
}

async function getProductData(){
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase: true}}),
        db.product.count({where: {isAvailableForPurchase: false}})
    ])
    return {activeCount, inactiveCount}
}

const AdminDashboard = async () => {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customer"
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

export default AdminDashboard;

function DashboardCard({ title, subtitle, body }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
