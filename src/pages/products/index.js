import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductList from '../../components/Products/ProductList';

const products = () => {
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/products/new');
    };
    const [productList, setProductList] = useState([]);

    const fetchData = async () => {
        await axios.get('/api/products').then((response) => {
            setProductList(response.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, [productList]);

    return (
        <Layout>
            <ProductList productList={productList} />
            <Button
                className={``}
                onClick={(e) => {
                    handleSubmit(e);
                }}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
            >
                create product
            </Button>
        </Layout>
    );
};

export default products;
