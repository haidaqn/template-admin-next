import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/ClipLoader';

const FormProduct = ({ _id, title: titleExisting, description: descriptionExisting, price: priceExisting }) => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [payload, setPayload] = useState({
        title: titleExisting,
        description: descriptionExisting,
        price: priceExisting
    });
    const [goToProduct, setGoToProduct] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (_id) {
            const response = await axios.put('/api/products', { ...payload, _id });
            if (response) {
                setGoToProduct(true);
                setLoader(false);
            }
        } else {
            const response = await axios.post('/api/products', payload);
            if (response) {
                setGoToProduct(true);
                setLoader(false);
            }
        }
    };

    useEffect(() => {
        if (goToProduct) router.push('/products');
    }, [goToProduct]);

    return (
        <>
            {loader ? (
                <div className="w-full mt-16 flex justify-center items-center">
                    <HashLoader color="#5542F6" size={100} />
                </div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e)} className="overflow-hidden">
                    <div className="mb-5">
                        <label>Product Name</label>
                        <input
                            type="text"
                            className="p-4 mt-2"
                            placeholder="Product name"
                            value={payload?.title}
                            name="title"
                            onChange={(e) => setPayload((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </div>
                    <div className="mb-5">
                        <label>Description</label>
                        <textarea
                            className="p-4 mt-2"
                            placeholder="Description"
                            value={payload?.description}
                            name="description"
                            onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
                        />
                    </div>
                    <div className="mb-5">
                        <label>Price (in $ USD)</label>
                        <input
                            type="number"
                            className="p-3 mt-2"
                            placeholder="Price"
                            value={payload?.price}
                            name="price"
                            onChange={(e) => setPayload((prev) => ({ ...prev, price: e.target.value }))}
                        />
                    </div>
                    <button onClick={(e) => handleSubmit(e)} type="submit" className="submit-button w-full">
                        <span>{_id ? 'edit product' : 'create product'}</span>
                    </button>
                </form>
            )}
        </>
    );
};

export default FormProduct;
