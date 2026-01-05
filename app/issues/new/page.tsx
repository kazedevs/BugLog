"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";


const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <h1 className="text-3xl font-bold mb-5">Create New Issue</h1>
            <TextField.Root placeholder="Title" />
            <TextArea placeholder="Description" />
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;