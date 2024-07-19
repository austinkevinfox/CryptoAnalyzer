import React, { Suspense } from "react";
import { sort } from "fast-sort";
import { getCryptoTokens } from "./CryptoService";
import DynamicTableHeader from "../components/dynamicTableHeader/DynamicTableHeader";

interface Token {
    name: string;
    code: string;
    rank: number;
    rate: number;
}
interface Props {
    searchParams: { sortOrder: string; sortDirection: string };
}

const CryptoPage = async ({
    searchParams: { sortOrder = "rank", sortDirection = "asc" },
}: Props) => {
    const tokenData = await getCryptoTokens();
    const sortedTokens =
        sortDirection === "desc"
            ? sort(tokenData).desc((token) => token[sortOrder as keyof Token])
            : sort(tokenData).asc((token) => token[sortOrder as keyof Token]);
    return (
        <>
            <h1>Top 10 Tokens from Exchange 1</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <table className="table table-bordered">
                    <DynamicTableHeader
                        path="/crypto"
                        sortOrder={sortOrder}
                        sortDirection={sortDirection}
                        links={[
                            { type: "rank", label: "#" },
                            { type: "name", label: "Token" },
                            { type: "rate", label: "Price" },
                        ]}
                    />

                    <tbody>
                        {sortedTokens.map((token) => (
                            <tr key={token.name}>
                                <td>{token.rank}</td>
                                <td>
                                    {`${token.name} 
                                ${token.code !== token.name ? token.code : ""}`}
                                </td>
                                <td>
                                    ${Number(token.rate).toLocaleString("en")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Suspense>
        </>
    );
};

export default CryptoPage;
