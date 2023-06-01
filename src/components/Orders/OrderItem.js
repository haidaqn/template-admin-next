import React from 'react';

const OrderItem = ({ createdAt, paid, email, country, line_items, name, city, postalCode, streetAddress }) => {
    return (
        <>
            <td className="border py-1">{new Date(createdAt).toLocaleString()}</td>
            <td className={paid ? 'text-green-600 border py-1' : 'text-red-600 border py-1'}>{paid ? 'YES' : 'NO'}</td>
            <td className="border py-1">
                {name} {email}
                <br />
                {city} {postalCode} {country}
                <br />
                {streetAddress}
            </td>
            <td className="border py-1">
                {line_items.map((l) => (
                    <>
                        {l.price_data?.product_data.name} x{l.quantity}
                        <br />
                    </>
                ))}
            </td>
        </>
    );
};

export default OrderItem;
