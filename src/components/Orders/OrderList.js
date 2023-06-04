import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/ClipLoader';
import OrderItem from './OrderItem';
import axios from 'axios';

const OrderList = () => {
    const [loader, setLoader] = useState(true);

    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        await axios.get('/api/orders').then((response) => setOrders(response?.data));
    };
    useEffect(() => {
        if (orders.length > 0) setLoader(false);
        else fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-3 mb-10 custom_scrollbar max-h-[650px] overflow-hidden overflow-y-auto">
            {loader && !orders.length === 0 ? (
                <div className="flex justify-center items-center w-full mt-14">
                    <HashLoader color="#5542F6" size={100} />
                </div>
            ) : (
                <table className="mt-2">
                    <thead>
                        <tr>
                            <th className="border py-2  ">Date</th>
                            <th className="border py-2  ">Paid</th>
                            <th className="border py-2  ">Recipient</th>
                            <th className="border py-2  ">Products</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {orders.map((order) => (
                            <OrderItem
                                key={order?._id}
                                createdAt={order?.createdAt}
                                paid={order?.paid}
                                email={order?.email}
                                country={order?.country}
                                line_items={order?.line_items}
                                name={order?.name}
                                city={order?.city}
                                postalCode={order?.postalCode}
                                streetAddress={order?.streetAddress}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderList;
