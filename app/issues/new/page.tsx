"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});


const NewIssuePage = () => {
    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Issue</h1>
                <p className="text-gray-400">Report a bug or suggest a new feature.</p>
            </div>
            
            <div className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Title</label>
                    <TextField.Root size="3" placeholder="Enter a descriptive title..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Description</label>
                    <SimpleMDE 
                        placeholder="What's the issue?" 
                        options={{
                            spellChecker: true,
                            status: false,
                            toolbar: ["bold", "italic", "heading", "|", "quote", "code", "link", "|", "preview", "side-by-side", "fullscreen"],
                            autosave: {
                                enabled: true,
                                uniqueId: "new-issue-description",
                                delay: 1000,
                            },
                        }}
                    />
                </div>

                <Button size="3" variant="solid" className="w-full sm:w-auto px-8 cursor-pointer">
                    Submit New Issue
                </Button>
            </div>
        </div>
    );
};

export default NewIssuePage;