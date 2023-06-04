import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import FormCategory from '@/components/Categories/FormCategory';

const EditCategory = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState([]);
    const fetchData = async () => {
        await axios.get(`/api/categories?id=${id}`).then((response) => {
            setData(response?.data);
        });
    };
    useEffect(() => {
        fetchData();
    }, [id]);

    console.log(data);

    return (
        <Layout>
            <h1 className="flex justify-center items-center text-[24px] font-medium">
                Edit Category <span className="text-red-500 ml-3 uppercase">{data?.name}</span>
            </h1>
            {data && <FormCategory data={data} />}
        </Layout>
    );
};

export default EditCategory;
