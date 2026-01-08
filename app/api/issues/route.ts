import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { CreateIssueSchema } from "@/app/validation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = CreateIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const { title, description, status } = validation.data;

  const newIssue = await prisma.issue.create({
    data: { title, description, status },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
