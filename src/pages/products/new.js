import React from 'react';
import Layout from '@/components/Layout';
import FormProduct from '@/components/products/FormProduct';

const NewProduct = () => {
    return (
        <Layout>
            <h1 className="text-center uppercase font-semibold text-[24px] mb-3">NewProduct</h1>
            <FormProduct />
        </Layout>
    );
};

export default NewProduct;
