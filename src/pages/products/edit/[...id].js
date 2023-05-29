import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import FormProduct from '@/components/FormProduct';
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

    // console.log(data);

    return (
        <Layout>
            <h1>Edit Product</h1>
            {data && <FormProduct {...data} />}
        </Layout>
    );
};

export default EditProduct;
