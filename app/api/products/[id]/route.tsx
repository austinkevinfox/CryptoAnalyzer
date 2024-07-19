import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export const GET = (
    request: NextRequest,
    { params }: { params: { id: number } }
) => {
    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ name: "Bread", id: 1 });
};

export const PUT = async (
    request: NextRequest,
    { params }: { params: { id: number } }
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

    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    /* Update the user
     * Return updated user
     */

    return NextResponse.json({ id: 1, name: body.name, price: body.price });
};

export const DELETE = (
    request: NextRequest,
    { params }: { params: { id: number } }
) => {
    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({});
};
