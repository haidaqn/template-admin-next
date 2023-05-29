import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/ClipLoader';

const FormProduct = ({
    _id,
    title: titleExisting,
    description: descriptionExisting,
    price: priceExisting,
    images: imageExisting
}) => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [payload, setPayload] = useState({
        title: titleExisting,
        description: descriptionExisting,
        price: priceExisting,
        image: imageExisting || []
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

    const upLoadImages = async (e) => {
        const files = [...e?.target?.files];
        if (files?.length > 0) {
            const data = new FormData();
            files?.forEach((file) => data.append('file ', file));
            const response = await axios.post('/api/upload', data);
            console.log(response);
        }
    };

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
                        <label>Photos</label>
                        <label className="w-24 cursor-pointer h-24 flex flex-col bg-gray-200 border justify-center items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <span className="text-lg font-medium">upload</span>
                            <input multiple type="file" onChange={(e) => upLoadImages(e)} className="hidden" />
                        </label>
                        <div className="">{!payload.image.length > 0 && <h1>no image</h1>}</div>
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
