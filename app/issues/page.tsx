
import {Button} from "@radix-ui/themes";
import Link from "next/link";


const IssuesPage = () => {
    return (
        <div className="space-y-5">
            <h1 className="text-3xl font-bold">Issues</h1>
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    )
}

export default IssuesPage