import React, { createContext, useContext, useState } from "react";
import { defaultTaskGroups } from "../default-tasks";
import type { TaskGroup, Task } from "../tasks.types"; // <-- Add Task here
import { TaskStatus } from "../tasks.types"; // <-- Add TaskStatus here
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function useTaskGroups() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(defaultTaskGroups);

  const addTaskToGroup = (title: string, content: string, dateTime?: string) => {
    setTaskGroups(prev => {
      const groupIndex = prev.findIndex(g => g.title === title);
      const newTask: Task = {
        id: Date.now(),
        content,
        status: TaskStatus.todo,
        ...(dateTime ? { dateTime } : {}),
      };
      if (groupIndex !== -1) {
        const updatedGroups = [...prev];
        updatedGroups[groupIndex] = {
          ...updatedGroups[groupIndex],
          tasks: [...updatedGroups[groupIndex].tasks, newTask],
        };
        return updatedGroups;
      } else {
        return [
          ...prev,
          {
            title,
            tasks: [newTask],
          },
        ];
      }
    });
  };

  const deleteGroup = (title: string) => {
    setTaskGroups(prev => prev.filter(g => g.title !== title));
  };

  const deleteTask = (groupTitle: string, taskId: number) => {
    setTaskGroups(prev =>
      prev.map(g =>
        g.title === groupTitle
          ? { ...g, tasks: g.tasks.filter(t => t.id !== taskId) }
          : g
      )
    );
  };

  const editTask = (groupTitle: string, taskId: number, newContent: string) => {
    setTaskGroups(prev =>
      prev.map(g =>
        g.title === groupTitle
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId ? { ...t, content: newContent } : t
              ),
            }
          : g
      )
    );
  };

  const setTaskStatus = (groupTitle: string, taskId: number, status: TaskStatus) => {
    setTaskGroups(prev =>
      prev.map(g =>
        g.title === groupTitle
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId ? { ...t, status } : t
              ),
            }
          : g
      )
    );
  };

  return {
    taskGroups,
    addTaskToGroup,
    deleteGroup,
    deleteTask,
    editTask,
    setTaskStatus,
  };
}

const TaskGroupsContext = createContext<ReturnType<typeof useTaskGroups> | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const value = useTaskGroups();
  return (
    <TaskGroupsContext.Provider value={value}>
      {children}
    </TaskGroupsContext.Provider>
  );
}

// Custom hook to use context
export function useTaskGroupsContext() {
  const ctx = useContext(TaskGroupsContext);
  if (!ctx) throw new Error("useTaskGroupsContext must be used within TasksProvider");
  return ctx;
}

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