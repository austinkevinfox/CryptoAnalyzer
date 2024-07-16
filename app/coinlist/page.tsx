import React, { Suspense } from "react";
interface Coin {
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
}

const CoinList = async () => {
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
    // const coinData: Coin[] = [
    //     {
    //         symbol: "BTC",
    //         name: "Bitcoin",
    //         current_price: 57678,
    //         market_cap: 500000000,
    //         market_cap_rank: 1,
    //     },
    // ];
    return (
        <>
            <div>CoinList</div>
            <Suspense fallback={<p>Loading ...</p>}>
                {coinData.map((coin) => (
                    <div key={coin.name} className="flex">
                        <div>{coin.name}</div>
                        <div>{coin.current_price}</div>
                    </div>
                ))}
            </Suspense>
        </>
    );
};

export default CoinList;
