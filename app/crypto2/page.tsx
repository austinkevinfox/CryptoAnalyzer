import React, { Suspense } from "react";
interface Coin {
    bitcoin: { usd: number };
}

const Crypto2 = async () => {
    let coinIds: string[] = ["bitcoin"];
    const tokenRequest = new Request(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(
            ","
        )}&vs_currencies=usd`,
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-api-key": "CG-K7dNCRUNdhdBAHwnXggo56WS",
            },
            cache: "no-store",
        }
    );
    const tokenRes = await fetch(tokenRequest);
    const tokenData: Coin = await tokenRes.json();
    

    return (
        <>
            <h1>Crypto2</h1>
            <Suspense fallback={<p>Loading ...</p>}>
                <div className="flex">
                    <div className="mr-5">BTC</div><div>${Number(tokenData.bitcoin.usd).toLocaleString("en")}</div>
                </div>
            </Suspense>
        </>
    );
};

export default Crypto2;
