import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import ProductList from '../../components/Products/ProductList';

const products = () => {
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/products/new');
    };

    return (
        <Layout>
            <ProductList />
            <button onClick={(e) => handleSubmit(e)} type="submit" className="submit-button w-full">
                <span>create product</span>
            </button>
        </Layout>
    );
};

export default products;
