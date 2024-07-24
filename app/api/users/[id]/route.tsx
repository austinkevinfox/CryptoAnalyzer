import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
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

    /* Fetch user with given id
     * If user does not exit, return 404
     */

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    /* Update the user
     * Return updated user
     */

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { name: body.name, email: body.email },
    });

    return NextResponse.json(updatedUser);
};

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const user = await prisma.user.findUnique({ where: {id: parseInt(params.id)}});

    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    await prisma.user.delete({ where: {id: user.id}});
    return NextResponse.json({});
};
