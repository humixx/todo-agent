import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTaskGroupsContext } from "@/lib/hooks/use-task-groups";

export function AddTodo() {
  const [groupTitle, setGroupTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [dateTime, setDateTime] = useState("");
  const { addTaskToGroup } = useTaskGroupsContext();

  const handleAddTask = () => {
    if (!groupTitle.trim() || !taskContent.trim()) return;
    addTaskToGroup(groupTitle.trim(), taskContent.trim(), dateTime || undefined);
    setTaskContent("");
    setDateTime("");
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleAddTask();
      }}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl"
    >
      <Input
        value={groupTitle}
        onChange={e => setGroupTitle(e.target.value)}
        type="text"
        placeholder="Enter group title (e.g. Work, Personal)"
        className="flex-1 bg-muted text-muted-foreground rounded-md px-4 py-2"
      />
      <Input
        value={taskContent}
        onChange={e => setTaskContent(e.target.value)}
        type="text"
        placeholder="Enter task description"
        className="flex-1 bg-muted text-muted-foreground rounded-md px-4 py-2"
      />
      <Input
        value={dateTime}
        onChange={e => setDateTime(e.target.value)}
        type="datetime-local"
        placeholder="Date & Time (optional)"
        className="flex-1 bg-muted text-muted-foreground rounded-md px-4 py-2"
      />
      <Button type="submit" disabled={!groupTitle || !taskContent}>
        Add
      </Button>
    </form>
  );
}
