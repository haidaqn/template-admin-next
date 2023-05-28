import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ productList }) => {
    return (
        <div className="flex flex-col gap-3 mb-10 custom_scrollbar max-h-[650px] overflow-hidden overflow-y-auto">
            <table className="mt-2">
                <thead>
                    <tr>
                        <th className="w-[85%] px-4 py-2 border bg-blue-300 text-white text-lg uppercase">
                            Product name
                        </th>
                        <th className="px-4 py-2 border bg-blue-300 text-white text-lg uppercase"></th>
                    </tr>
                </thead>
                <tbody className="">
                    {productList.map((product) => (
                        <ProductItem key={product._id} title={product.title} id={product._id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
