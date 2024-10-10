import ProductCard from "./components/ProductCard";

export default function Home() {
    return (
        <main>
            <h1>Cryptocurrency Analyzer</h1>

            <p>
                We analyze and compare cryptocurrency data servered up by
                multiple crypo API resources, supporting our customers&apos;
                decision making process.
            </p>

            <ProductCard />
        </main>
    );
}
