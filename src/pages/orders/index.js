import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import OrderList from '@/components/Orders/OrderList';

const orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        await axios.get('/api/orders').then((response) => setOrders(response?.data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <h1 className="flex justify-center items-center font-medium text-[24px]">Order</h1>
            <OrderList orders={orders} />
        </Layout>
    );
};

export default orders;
