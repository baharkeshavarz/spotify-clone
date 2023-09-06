import User from "@/lib/mongo/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST ( request: Request) {
    const body = await request.json();
    console.log("body,::", body)
    const {
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const { firstName, lastName } = name.split(" ");
    const user = new User();
    user.email = email;
    user.image ="placeholder.png"
    user.password= hashedPassword;
    user.first_name= firstName;
    user.last_name= lastName;

    const res = await user.save(); 

    return NextResponse.json(user)
}