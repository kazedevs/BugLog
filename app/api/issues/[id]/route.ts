import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { CreateIssueSchema } from "@/app/validation";

async function getIssue(id: number) {
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  return issue;
}

function getIdFromParams(params: { id: string }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return {
      response: NextResponse.json(
        { message: "Invalid issue ID" },
        { status: 400 }
      ),
    };
  }

  return { id };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const parsed = getIdFromParams(params);
    if ("response" in parsed) return parsed.response;

    const body = await request.json();
    const validation = CreateIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const { title, description, status } = validation.data;
    const { id } = parsed;

    const existingIssue = await getIssue(id);
    if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: { title, description, status },
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const parsed = getIdFromParams(params);
    if ("response" in parsed) return parsed.response;

    const { id } = parsed;

    const issue = await getIssue(id);
    if (!issue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
