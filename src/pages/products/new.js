import React from 'react';
import Layout from '@/components/Layout';
import FormProduct from '../../components/Products/FormProduct';
const NewProduct = () => {
    return (
        <Layout>
            <h1 className="text-center capitalize font-semibold text-[24px] mb-3">create a new product</h1>
            <FormProduct />
        </Layout>
    );
};

export default NewProduct;
