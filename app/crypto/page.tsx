import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";
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
    const tokenRequest = new Request(
        "https://api.livecoinwatch.com/coins/list",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": "74993664-c23b-4043-8812-2c9dd5d881ca",
            },
            body: JSON.stringify({
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 10,
                meta: true,
            }),
            next: { revalidate: 10 },
        }
    );

    const tokenRes = await fetch(tokenRequest);
    const tokenData: Token[] = await tokenRes.json();
    const sortedTokens =
        sortDirection === "desc"
            ? sort(tokenData).desc((token) => token[sortOrder as keyof Token])
            : sort(tokenData).asc((token) => token[sortOrder as keyof Token]);
    return (
        <>
            <h1>Top 10 Tokens</h1>
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
                            <td>${Number(token.rate).toLocaleString("en")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CryptoPage;
