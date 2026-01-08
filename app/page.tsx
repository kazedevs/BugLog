import prisma from "@/prisma/prisma";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./components/IssueStatusBadge";

export default async function Home() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5, // Just show the latest 5 on the dashboard
  });

  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const stats = [
    { label: "Open Issues", value: openIssues },
    { label: "In Progress", value: inProgressIssues },
    { label: "Closed Issues", value: closedIssues },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-10 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-zinc-500">
          Overview of project health and latest activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="py-6 border-b border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-5xl font-light mt-4 text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-medium text-zinc-200">Recent Issues</h2>
          <Link
            href="/issues"
            className="text-zinc-400 hover:text-white transition-colors text-sm"
          >
            All issues →
          </Link>
        </div>

        <div className="overflow-hidden">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="text-zinc-500 font-medium">
                  Issue
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell text-zinc-500 font-medium">
                  Status
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell text-zinc-500 font-medium text-right">
                  Created
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {issues.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={3}
                    className="text-center py-12 text-zinc-500 italic"
                  >
                    No issues recorded yet.
                  </Table.Cell>
                </Table.Row>
              ) : (
                issues.map((issue) => (
                  <Table.Row
                    key={issue.id}
                    className="border-b border-zinc-800/50"
                  >
                    <Table.Cell>
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/issues/edit/${issue.id}`}
                          className="text-zinc-200 hover:text-white transition-colors"
                        >
                          {issue.title}
                        </Link>
                        <div className="md:hidden">
                          <IssueStatusBadge status={issue.status} />
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">
                      <IssueStatusBadge status={issue.status} />
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell text-zinc-500 text-right">
                      {issue.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
}
