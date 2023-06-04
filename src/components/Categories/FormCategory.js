import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FormCategory = ({ data }) => {
    const [payload, setPayload] = useState({
        name: data?.name || '',
        parent: data?.parent || ''
    });

    const [properties, setProperties] = useState(data?.properties || [{ name: '', values: '' }]);
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
        await axios.get('/api/categories').then((response) => {
            const data = response?.data
                .filter((item) => item?.parent?.name !== undefined)
                .map((item) => item?.parent?.name);
            setCategories(data);
        });
    };

    const resetPayload = () => {
        setPayload({
            name: '',
            parent: ''
        });
    };

    const handlePropertyValuesChange = (index, property, newValues) => {
        setProperties((prev) => {
            const updatedProperties = [...prev];
            updatedProperties[index].values = newValues;
            return updatedProperties;
        });
    };

    const handlePropertyNameChange = (index, property, newName) => {
        setProperties((prev) => {
            const updatedProperties = [...prev];
            updatedProperties[index].name = newName;
            return updatedProperties;
        });
    };

    const addProperty = () => {
        setProperties((prev) => [...prev, { name: '', values: '' }]);
    };

    const removeProperty = (indexRemove) => {
        setProperties((prev) => {
            return [...prev].filter((item, index) => {
                return index !== indexRemove;
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submit');
        if (data?._id) {
        } else {
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="mt-6 w-full ">
            <form className="flex flex-col gap-3 mb-5 overflow-hidden">
                <div className="w-full flex gap-3 ">
                    <input
                        value={payload?.parent}
                        type="text"
                        className="py-1 px-4 w-3/5 h-10"
                        placeholder="Example: iphone12"
                        onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <select
                        value={payload?.parent}
                        className=" px-3 h-10 w-2/5"
                        onChange={(e) => setPayload((prev) => ({ ...prev, parent: e.target.value }))}
                    >
                        <option>no parent category</option>
                        {categories?.map((item) => (
                            <option key={item._id}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg uppercase">properties</h2>
                        <button
                            type="button"
                            className="bg-blue-300 p-2 rounded-lg hover:opacity-80"
                            onClick={() => addProperty()}
                        >
                            <span>add new properties</span>
                        </button>
                    </div>
                    <div className="my-3 overflow-hidden overflow-y-auto custom_scrollbar max-h-[200px]">
                        {properties.length > 0 &&
                            properties.map((property, index) => (
                                <div key={index} className="flex gap-3 mb-4">
                                    <input
                                        type="text"
                                        value={property.name}
                                        className="mb-0 px-4"
                                        onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
                                        placeholder="property name (example: color)"
                                    />
                                    <input
                                        type="text"
                                        className="mb-0 px-4"
                                        onChange={(ev) => handlePropertyValuesChange(index, property, ev.target.value)}
                                        value={property.values}
                                        placeholder="values, comma separated"
                                    />
                                    <button
                                        onClick={() => removeProperty(index)}
                                        type="button"
                                        className="ml-4 hover:bg-blue-300 rounded-full p-1"
                                    >
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
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </form>
            <button onClick={(e) => handleSubmit(e)} className="submit-button">
                <span className="text-white font-normal uppercase ">save</span>
            </button>
        </div>
    );
};

export default FormCategory;
