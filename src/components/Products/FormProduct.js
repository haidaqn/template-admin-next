import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/ClipLoader';
import Spinner from '../Spinner';

const FormProduct = ({
    _id,
    title: titleExisting,
    description: descriptionExisting,
    price: priceExisting,
    images: imageExisting,
    category: categoryExisting,
    properties: propertyExisting
}) => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [productProperties, setProductProperties] = useState(propertyExisting || {});
    const [payload, setPayload] = useState({
        title: titleExisting,
        description: descriptionExisting,
        price: priceExisting,
        images: imageExisting || [],
        category: categoryExisting
    });
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
        await axios.get('/api/categories').then((response) => {
            setCategories(response?.data);
        });
    };
    const [goToProduct, setGoToProduct] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const data = { ...payload, properties: productProperties };
        if (_id) {
            const response = await axios.put('/api/products', { data, _id });
            if (response) {
                setGoToProduct(true);
                setLoader(false);
            }
        } else {
            const response = await axios.post('/api/products', data);
            if (response) {
                setGoToProduct(true);
                setLoader(false);
            }
        }
    };

    function setProductProp(propName, value) {
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (goToProduct) router.push('/products');
    }, [goToProduct]);
    const upLoadImages = async (e) => {
        const files = [...e?.target?.files];
        setIsUploading(true);
        if (files?.length > 0) {
            try {
                const data = new FormData();
                files?.forEach((file) => data.append('file', file));
                const response = await axios.post('/api/upload', data);
                setPayload((prev) => ({ ...prev, images: [...prev.images, ...response?.data?.links] }));
                setIsUploading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const [propertiesToFill, setPropertiesToFill] = useState([]);

    useEffect(() => {
        if (categories.length > 0 && payload.category) {
            let info = categories.find((item) => item._id === payload.category);
            let tempPropertiesToFill = [...info.properties];
            while (info?.parent?._id) {
                const parentCat = categories.find(({ _id }) => _id === info?.parent?._id);
                tempPropertiesToFill = [...tempPropertiesToFill, ...parentCat.properties];
                info = parentCat;
            }
            setPropertiesToFill(tempPropertiesToFill);
            console.log(tempPropertiesToFill);
        }
    }, [payload.category, categories]);

    //

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
                    <div className="">
                        <label>Category</label>
                        <select
                            className="p-2"
                            value={payload?.category}
                            onChange={(ev) => setPayload((prev) => ({ ...prev, category: ev.target.value }))}
                        >
                            <option value="">Uncategorized</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {propertiesToFill.length > 0 && payload.category !== '' && (
                        <div className="my-3">
                            {propertiesToFill.map((item) => (
                                <div key={item.name} className="flex gap-3">
                                    <label>{item.name}</label>
                                    <div>
                                        <select
                                            value={productProperties[item.name] || ''}
                                            onChange={(ev) => setProductProp(item.name, ev.target.value)}
                                        >
                                            <option value="">Select an option</option>
                                            {item.values.split(',').map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <label className="mt-5">Photos</label>
                    <div className="mb-5 flex flex-wrap gap-2">
                        {!payload?.images.length > 0 ? (
                            <h1>no image</h1>
                        ) : (
                            payload?.images?.map((image) => (
                                <img key={image} src={image} className="w-24 h-24 rounded-lg" />
                            ))
                        )}
                        {isUploading && (
                            <div className="h-24 flex items-center">
                                <Spinner />
                            </div>
                        )}
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
                    </div>
                    <div className="mb-5">
                        <label>Description</label>
                        <textarea
                            className="p-4 mt-2"
                            placeholder="Description"
                            value={payload?.description}
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
