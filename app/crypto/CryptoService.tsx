interface Token {
    name: string;
    code: string;
    rank: number;
    rate: number;
}

export const getCryptoTokens = async () => {
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
            cache: "no-store",
        }
    );

    const tokenRes = await fetch(tokenRequest);
    const tokenData: Token[] = await tokenRes.json();
    return tokenData;
};
