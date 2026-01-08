"use client";

import { useRouter, useParams } from "next/navigation";
import { statuses } from "@/app/validation";
import { Button, Callout, Select, Spinner, TextField } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function EditIssuePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OPEN");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await fetch(`/api/issues/${id}`);
        if (!response.ok) throw new Error("Failed to fetch issue");
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
      } catch (error) {
        setError("Failed to load issue");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      });

      if (!response.ok) throw new Error("Failed to update issue");

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An error occurred while updating the issue");
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Edit Issue</h1>
          <p className="text-gray-400">Update the details of this issue.</p>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
          <Button onClick={() => router.push("/issues")}>Back to Issues</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Edit Issue</h1>
        <p className="text-gray-400">Update the details of this issue.</p>
      </div>

      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-zinc-300 mb-2 block">
              Title
            </label>
            <TextField.Root
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              required
            />

            <label className="text-sm font-medium text-zinc-300 mb-2 block">
              Status
            </label>
            <Select.Root
              value={status}
              onValueChange={(value) => setStatus(value)}
            >
              <Select.Trigger
                placeholder="Select status..."
                className="w-full"
              />
              <Select.Content>
                {statuses.map((s) => (
                  <Select.Item key={s} value={s}>
                    {s.replace("_", " ")}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 mb-2 block">
              Description
            </label>
            <SimpleMDE
              value={description}
              onChange={setDescription}
              placeholder="What's the issue?"
            />
          </div>

          <div className="flex space-x-4 justify-between">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 cursor-pointer"
            >
              Update Issue
              {isSubmitting && <Spinner />}
            </Button>
            <Button
              type="button"
              variant="soft"
              onClick={() => router.push("/issues")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
