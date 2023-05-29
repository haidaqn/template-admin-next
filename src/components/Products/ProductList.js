import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import HashLoader from 'react-spinners/ClipLoader';

const ProductList = ({ productList }) => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (productList.length > 0) setLoader(false);
    }, [productList]);

    return (
        <div className="flex flex-col gap-3 mb-10 custom_scrollbar max-h-[650px] overflow-hidden overflow-y-auto">
            {loader && !productList.length === 0 ? (
                <div className="flex justify-center items-center w-full mt-14">
                    <HashLoader color="#5542F6" size={100} />
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default ProductList;
