import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FormProduct = () => {
    const router = useRouter();
    const [payload, setPayload] = useState({
        title: '',
        description: '',
        price: +0
    });
    const [goToProduct, setGoToProduct] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/products', payload);
        if (response) setGoToProduct(true);
    };
    useEffect(() => {
        if (goToProduct) router.push('/products');
    }, [goToProduct]);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="">
                <label>Product Name</label>
                <input
                    type="text"
                    className=""
                    placeholder="Product name"
                    value={payload.title}
                    name="title"
                    onChange={(e) => setPayload((prev) => ({ ...prev, title: e.target.value }))}
                />
            </div>
            <div className="">
                <label>Description</label>
                <textarea
                    className=""
                    placeholder="Description"
                    value={payload.description}
                    name="description"
                    onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
                />
            </div>
            <div className="">
                <label>Price (in $ USD)</label>
                <input
                    type="number"
                    className=""
                    placeholder="Price"
                    value={payload.price}
                    name="price"
                    onChange={(e) => setPayload((prev) => ({ ...prev, price: e.target.value }))}
                />
            </div>
            <button onClick={(e) => handleSubmit(e)} type="submit" className="submit-button w-full">
                <span>create product</span>
            </button>
        </form>
    );
};

export default FormProduct;
