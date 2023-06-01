import React from 'react';
import Layout from '@/components/Layout';
import FormCategory from '@/components/Categories/FormCategory';
import CategoryList from '@/components/Categories/CategoryList';

const Categories = () => {
    return (
        <Layout>
            <h1 className="flex justify-center items-center">Create Categories</h1>
            <FormCategory />
            <CategoryList />
        </Layout>
    );
};

export default Categories;
