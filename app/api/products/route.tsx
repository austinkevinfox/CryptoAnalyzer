import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export const GET = async (request: NextRequest) => {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
};

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const product = await prisma.product.findUnique({
        where: { name: body.name },
    });

    if (product)
        return NextResponse.json(
            { error: "Product already exists" },
            { status: 400 }
        );

    const newProduct = await prisma.product.create({
        data: { name: body.name, price: body.price },
    });

    return NextResponse.json(newProduct, { status: 201 });
};
