import React, { Suspense } from "react";
import { sort } from "fast-sort";
import DynamicTableHeader from "../components/dynamicTableHeader/DynamicTableHeader";

interface Coin {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
}
interface Props {
    searchParams: { sortOrder: string; sortDirection: string };
}

const CoinList = async ({
    searchParams: { sortOrder = "market_cap_rank", sortDirection = "asc" },
}: Props) => {
    const tokenRequest = new Request(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10",
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-cg-demo-api-key": "CG-K7dNCRUNdhdBAHwnXggo56WS",
            },
            cache: "no-store",
        }
    );
    const coinRes = await fetch(tokenRequest);
    let coinData: Coin[] = await coinRes.json();
    const sortedTokens =
        sortDirection === "desc"
            ? sort(coinData).desc((token) => token[sortOrder as keyof Coin])
            : sort(coinData).asc((token) => token[sortOrder as keyof Coin]);

    const getNameCell = (token: Coin) => {
        if (token.symbol.toLowerCase() === token.name.toLocaleLowerCase()) {
            return token.name;
        }

        return (
            <>
                <span>{token.name}</span>
                <span className="uppercase pl-2">{token.symbol}</span>
            </>
        );
    };
    return (
        <>
            <h1>Top 10 Tokens from Exchange 2</h1>
            <Suspense fallback={<p>Loading ...</p>}>
                <table className="table table-bordered">
                    <DynamicTableHeader
                        path="/coinlist"
                        sortOrder={sortOrder}
                        sortDirection={sortDirection}
                        links={[
                            { type: "market_cap_rank", label: "#" },
                            { type: "name", label: "Token" },
                            { type: "current_price", label: "Price" },
                        ]}
                    />

                    <tbody>
                        {sortedTokens.map((token) => (
                            <tr key={token.id}>
                                <td>{token.market_cap_rank}</td>
                                <td>{getNameCell(token)}</td>
                                <td>
                                    $
                                    {Number(token.current_price).toLocaleString(
                                        "en"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Suspense>
        </>
    );
};

export default CoinList;
