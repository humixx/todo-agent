import { TaskGroup, TaskStatus } from "./tasks.types";

export const defaultTaskGroups: TaskGroup[] = [
  {
    title: "Work",
    tasks: [
      {
        id: 1,
        content: "Complete project proposal",
        status: TaskStatus.done,
        dateTime: "2023-10-01T10:00:00Z", // Example dateTime
      },
      {
        id: 2,
        content: "Review design mockups",
        status: TaskStatus.done,
        dateTime: "2023-10-01T12:00:00Z", // Example dateTime
      },
      {
        id: 3,
        content: "Prepare presentation slides",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T14:00:00Z", // Example dateTime
      },
      {
        id: 4,
        content: "Send meeting notes email",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T16:00:00Z", // Example dateTime
      },
    ],
  },
  {
    title: "Personal",
    tasks: [
      {
        id: 5,
        content: "Call Ben at 4",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T16:00:00Z", // Example dateTime
      },
      {
        id: 6,
        content: "Buy groceries",
        status: TaskStatus.todo,
      },
      {
        id: 9,
        content: "Read a new book",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T18:00:00Z", // Example dateTime
      },
    ],
  },
  {
    title: "Code Review",
    tasks: [
      {
        id: 7,
        content: "Review Uli's pull request",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T15:00:00Z", // Example dateTime
      },
      {
        id: 8,
        content: "Test new authentication flow",
        status: TaskStatus.todo,
      },
    ],
  },
  {
    title: "Fitness",
    tasks: [
      {
        id: 10,
        content: "Go for a run",
        status: TaskStatus.todo,
      },
      {
        id: 11,
        content: "Yoga session",
        status: TaskStatus.todo,
        dateTime: "2023-10-01T15:00:00Z",
      },
    ],
  },
];