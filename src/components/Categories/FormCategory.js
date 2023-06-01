import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList';
import Link from 'next/link';

const FormCategory = () => {
    const [payload, setPayload] = useState({
        name: '',
        parentCategory: '',
        properties: []
    });
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
            parentCategory: '',
            properties: []
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submit');
    };

    return (
        <div className="mt-6 w-full">
            <form className="flex gap-3 items-center justify-center mb-5">
                <div className="w-full flex gap-3 ">
                    <input type="text" className="py-1 px-4 w-3/5 h-10" placeholder="Example: iphone12" />
                    <select className=" px-3 h-10 w-1/5">
                        <option>no parent category</option>
                        {categories?.map((item) => (
                            <option key={item._id}>{item}</option>
                        ))}
                    </select>
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="h-10 max-w-[140px] w-[100px] py-1 px-3 bg-blue-900 rounded-lg text-center text-white hover:opacity-80"
                    >
                        <h2 className="text-white font-normal uppercase">save</h2>
                    </button>
                </div>
            </form>
            <div className="my-3">properties</div>
        </div>
    );
};

export default FormCategory;
