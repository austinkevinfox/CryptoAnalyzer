import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
    return NextResponse.json([
        { name: "Bread", id: 1, price: 1 },
        { name: "Eggs", id: 2, price: 3 },
        { name: "Milk", id: 3, price: 5 },
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });
    return NextResponse.json(
        { id: 1, name: body.name, price: body.price },
        { status: 201 }
    );
}
