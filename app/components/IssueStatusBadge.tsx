import { Status } from "@/app/generated/prisma";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "violet" | "red" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "red" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status];
  return (
    <Badge color={color} variant="soft">
      {label}
    </Badge>
  );
};

export default IssueStatusBadge;
