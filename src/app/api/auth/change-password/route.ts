import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { hash, compare } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { isStrongPassword } from "@/lib/utils/validation";

const secret = process.env.NEXTAUTH_SECRET!;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isStrongPassword(newPassword)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters and include a letter and a number.",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await compare(currentPassword, user.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 403 }
    );
  }

  const hashed = await hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
