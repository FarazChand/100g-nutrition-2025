import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

import { isValidEmail, isStrongPassword } from "@/lib/utils/validation";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    // Input Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: "Password too weak" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Signup Error: ", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
