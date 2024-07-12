import React from "react";
interface Props {
    params: { slug: string[] };
    searchParams: { sortOrder: string };
}

const ProductPage = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {
    return (
        <>
            {slug?.map((name) => ` / ${name}`)}
            <h1>ProductPage</h1>
            <h2>Sort order: {sortOrder}</h2>
        </>
    );
};

export default ProductPage;
