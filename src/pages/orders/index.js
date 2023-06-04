import React from 'react';
import Layout from '@/components/Layout';
import OrderList from '@/components/Orders/OrderList';

const orders = () => {
    return (
        <Layout>
            <h1 className="flex justify-center items-center font-medium text-[24px]">Order</h1>
            <OrderList />
        </Layout>
    );
};

export default orders;
