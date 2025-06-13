"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-task-groups";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotActions } from "@/components/CopilotActions";
import "@copilotkit/react-ui/styles.css";
import { MyOpenIcon } from "@/components/MyCloseIcon";
import { MyCloseIcon } from "@/components/MyCloseIcon";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <TasksProvider>
          <CopilotActions />
          <TasksList />
        </TasksProvider>

        <CopilotPopup
          icons={{
            openIcon: <MyOpenIcon />,
            closeIcon: <MyCloseIcon />,
          }}
          labels={{
    initial: "👋 Hi! Ready to help you organize your tasks.",
    title: "✨ Task Genie",
    placeholder: "Type your task or question...",
    stopGenerating: "Stop",
    regenerateResponse: "Try Again",
  }}
        />
      </CopilotKit>
    </>
  );
}
