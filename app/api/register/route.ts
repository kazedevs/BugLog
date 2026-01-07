import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (user) {
    return NextResponse.json(
      { message: "Username already taken" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      hashedPassword,
    },
  });

  return NextResponse.json({ username: newUser.username }, { status: 201 });
}
