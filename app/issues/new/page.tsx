"use client";

import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useMemo, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIssueSchema } from "@/app/validation";

type IssueForm = z.infer<typeof CreateIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});


const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(CreateIssueSchema),
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mdeOptions = useMemo(() => {
        return {
            spellChecker: true,
            status: false,
            toolbar: ["bold", "italic", "heading", "|", "quote", "code", "link", "|", "preview", "side-by-side", "fullscreen"] as any,
            autosave: {
                enabled: true,
                uniqueId: "new-issue-description",
                delay: 1000,
            },
        };
    }, []);

    const onSubmit = handleSubmit(async(data) => {
        try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setIsSubmitting(false);
            setError('Failed to create issue');
        }
    });

    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Issue</h1>
                <p className="text-gray-400">Report a bug or suggest a new feature.</p>
            </div>
            
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                <form   
                    onSubmit={onSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Title</label>
                        <TextField.Root size="3" placeholder="Enter a descriptive title..." {...register('title')}/>
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Description</label>
                        <Controller 
                            name="description" 
                            control={control} 
                            render={({ field }) => (
                                <SimpleMDE 
                                    placeholder="What's the issue?" 
                                    options={mdeOptions}
                                    {...field}
                                />
                            )}
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                    {error && <Callout.Root color="red">
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>}
                    <Button disabled={isSubmitting} size="3" variant="solid" className="w-full sm:w-auto px-8 cursor-pointer!">
                        Submit New Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewIssuePage;