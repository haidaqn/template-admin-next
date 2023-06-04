import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import FormProduct from '@/components/Products/FormProduct';
import axios from 'axios';

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);

    const fetchData = async () => {
        await axios.get(`/api/products?id=${id}`).then((response) => {
            setData(response.data);
        });
    };
    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <Layout>
            <h1 className="flex justify-center items-center text-[24px] font-medium">Edit Product {data?.name}</h1>
            {data && <FormProduct {...data} />}
        </Layout>
    );
};

export default EditProduct;
