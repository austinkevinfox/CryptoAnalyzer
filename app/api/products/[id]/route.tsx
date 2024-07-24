import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!product)
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );

    return NextResponse.json(product);
};

export const PUT = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    /* Validate request body
     * If invalid, return 400
     */
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    /* Fetch product with given id
     * If product does not exit, return 404
     */
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!product)
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );

    /* Update the product
     * Return updated product
     */

    const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: { name: body.name, price: body.price },
    });

    return NextResponse.json(updatedProduct);
};

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!product)
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );

    await prisma.product.delete({ where: { id: product.id } });
    return NextResponse.json({});
};
