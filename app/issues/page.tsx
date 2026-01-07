import prisma from "@/prisma/prisma";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-10 px-4">
            <div className="flex items-end justify-between border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Issues</h1>
                    <p className="text-zinc-500 text-sm mt-1">Full index of tracked items.</p>
                </div>
                <Button size="2" variant="outline" color="gray" className="cursor-pointer">
                    <Link href="/issues/new">New Issue</Link>
                </Button>
            </div>

            <div className="overflow-hidden">
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-zinc-500 font-medium">Issue</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell text-zinc-500 font-medium">Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell text-zinc-500 font-medium text-right">Created</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {issues.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={3} className="text-center py-20 text-zinc-500 italic">
                                    No issues found.
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            issues.map((issue) => (
                                <Table.Row key={issue.id} className="border-b border-zinc-800/50">
                                    <Table.Cell>
                                        <div className="flex flex-col gap-1">
                                            <Link 
                                                href={`/issues/${issue.id}`} 
                                                className="text-zinc-200 hover:text-white transition-colors"
                                            >
                                                {issue.title}
                                            </Link>
                                            <div className="md:hidden text-xs">
                                                <IssueStatusBadge status={issue.status} />
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="hidden md:table-cell">
                                        <IssueStatusBadge status={issue.status} />
                                    </Table.Cell>
                                    <Table.Cell className="hidden md:table-cell text-zinc-500 text-right">
                                        {issue.createdAt.toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    )
}

export default IssuesPage