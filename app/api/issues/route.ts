import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/prisma";

const CreateIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = CreateIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      validation.error.issues,
      { status: 400 }
    );
  }

  const { title, description } = validation.data;

  const newIssue = await prisma.issue.create({
    data: { title, description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}