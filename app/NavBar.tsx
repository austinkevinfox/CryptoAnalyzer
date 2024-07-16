import Link from "next/link";
import React from "react";

const NavBar = () => {
    return (
        <div className="flex p-5 border-b-2 border-blue-900">
            <Link href="/" className="mr-5">
                Home
            </Link>
            <Link href="/users" className="mr-5">
                Users
            </Link>
            <Link href="/crypto" className="mr-5">
                Cryptocurrencies
            </Link>
            <Link href="/crypto2" className="mr-5">
                Crypto2
            </Link>
            <Link href="/coinlist" className="mr-5">
                Coin List
            </Link>
            <Link href="/" className="mr-5">
                TBD
            </Link>
        </div>
    );
};

export default NavBar;
