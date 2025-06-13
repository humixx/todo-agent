"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { useTaskGroupsContext } from "@/lib/hooks/use-task-groups";
import { TaskStatus } from "@/lib/tasks.types";

export function CopilotActions() {
  const {
    addTaskToGroup,
    editTask,
    deleteTask,
    deleteGroup,
    setTaskStatus,
    taskGroups,
   
  } = useTaskGroupsContext();

  useCopilotAction({
    name: "addTaskToGroup",
    description: "Add a new task to a group. Provide groupTitle, content, and optionally dateTime (ISO string).",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "content", type: "string" },
      { name: "dateTime", type: "string", optional: true },
    ],
    handler: async ({ groupTitle, content, dateTime }) => {
      addTaskToGroup(groupTitle, content, dateTime);
      return `Task "${content}" added to group "${groupTitle}"${dateTime ? ` at ${dateTime}` : ""}.`;
    },
  });

  useCopilotAction({
    name: "editTask",
    description: "Edit a task in a group. Provide groupTitle, taskId, and newContent.",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "taskId", type: "number" },
      { name: "newContent", type: "string" },
    ],
    handler: async ({ groupTitle, taskId, newContent }) => {
      editTask(groupTitle, taskId, newContent);
      return `Task ${taskId} in group "${groupTitle}" updated.`;
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Delete a task from a group. Provide groupTitle and taskId.",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "taskId", type: "number" },
    ],
    handler: async ({ groupTitle, taskId }) => {
      deleteTask(groupTitle, taskId);
      return `Task ${taskId} deleted from group "${groupTitle}".`;
    },
  });

  useCopilotAction({
    name: "deleteGroup",
    description: "Delete a whole group by title.",
    parameters: [
      { name: "groupTitle", type: "string" },
    ],
    handler: async ({ groupTitle }) => {
      deleteGroup(groupTitle);
      return `Group "${groupTitle}" deleted.`;
    },
  });

  useCopilotAction({
    name: "setTaskStatus",
    description: "Set a task's status in a group. Provide groupTitle, taskId, and status ('todo' or 'done').",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "taskId", type: "number" },
      { name: "status", type: "string" },
    ],
    handler: async ({ groupTitle, taskId, status }) => {
      if (status !== "todo" && status !== "done") {
        return "Status must be 'todo' or 'done'.";
      }
      setTaskStatus(groupTitle, taskId, status as TaskStatus);
      return `Task ${taskId} in group "${groupTitle}" marked as ${status}.`;
    },
  });

  useCopilotAction({
    name: "markTaskDone",
    description: "Mark a task as done. Provide groupTitle and taskId.",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "taskId", type: "number" },
    ],
    handler: async ({ groupTitle, taskId }) => {
      setTaskStatus(groupTitle, taskId, TaskStatus.done);
      return `Task ${taskId} in group "${groupTitle}" marked as done.`;
    },
  });

  useCopilotAction({
    name: "markTaskIncomplete",
    description: "Mark a task as incomplete. Provide groupTitle and taskId.",
    parameters: [
      { name: "groupTitle", type: "string" },
      { name: "taskId", type: "number" },
    ],
    handler: async ({ groupTitle, taskId }) => {
      setTaskStatus(groupTitle, taskId, TaskStatus.todo);
      return `Task ${taskId} in group "${groupTitle}" marked as incomplete.`;
    },
  });

  useCopilotAction({
    name: "listGroups",
    description: "List all task group titles.",
    parameters: [],
    handler: async () => {
      const titles = taskGroups.map((g) => g.title).join(", ");
      return `Task groups: ${titles}`;
    },
  });

  useCopilotAction({
    name: "listTasksInGroup",
    description: "List all tasks in a group. Provide groupTitle.",
    parameters: [
      { name: "groupTitle", type: "string" },
    ],
    handler: async ({ groupTitle }) => {
      const group = taskGroups.find((g) => g.title === groupTitle);
      if (!group) return `Group "${groupTitle}" not found.`;
      if (group.tasks.length === 0) return `No tasks in group "${groupTitle}".`;
      return group.tasks.map((t) => `#${t.id}: ${t.content} [${t.status}]`).join("\n");
    },
  });

 
 

  return null;
}