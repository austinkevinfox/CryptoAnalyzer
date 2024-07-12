"use client";
import React from "react";

const AddToCart = () => {
    return (
        <button
            className="btn btn-primary"
            onClick={() => {
                console.log("AddToken");
            }}
        >
            Add Token
        </button>
    );
};

export default AddToCart;
