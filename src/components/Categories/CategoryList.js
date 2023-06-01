import React, { useCallback, useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const fetchData = useCallback(async () => {
        const response = await axios.get('/api/categories').then((response) => setCategories(response?.data));
    }, []);

    const handleCategoryDelete = useCallback(async (categoryId) => {
        const response = await axios.delete(`/api/categories?_id=${categoryId}`);
        if (response) fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-3 mb-10 custom_scrollbar max-h-[650px] overflow-hidden overflow-y-auto">
            <table className="mt-4 w-full">
                <thead>
                    <tr className="">
                        <td className="w-[43%] border py-1 px-4 bg-blue-300 text-white text-lg uppercase">
                            Category name
                        </td>
                        <td className="w-[43%] border py-1 px-4 bg-blue-300 text-white text-lg uppercase">
                            Parent category
                        </td>
                        <td className="w-[14%] border py-1 px-4 bg-blue-300 text-white text-lg uppercase"></td>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length > 0 &&
                        categories.map((category) => (
                            <CategoryItem
                                key={category._id}
                                category={category}
                                onCategoryDelete={handleCategoryDelete}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
