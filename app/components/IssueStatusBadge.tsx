import { Status } from "@/app/generated/prisma";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string }
> = {
  OPEN: { label: "Open" },
  IN_PROGRESS: { label: "In Progress" },
  CLOSED: { label: "Closed" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color="gray" variant="surface">{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
