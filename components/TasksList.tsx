"use client";

import { AddTodo } from "@/components/AddTodo";
import { Task } from "@/components/Task";
import { useTaskGroupsContext } from "@/lib/hooks/use-task-groups";
import { AnimatePresence } from "framer-motion";
import { TrashIcon } from "lucide-react";

export function TasksList() {
  const { taskGroups, deleteGroup } = useTaskGroupsContext();

  return (
    <main className="animated-gradient-bg flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <div className="flex flex-col gap-8 w-full max-w-5xl items-center">
        <h1 className="text-2xl font-bold text-white">✍️ My To-do&apos;s</h1>
        <AddTodo />
        <div className="w-full mt-6 flex flex-col gap-12">
          {taskGroups.map((group) => (
            <div
              key={group.title}
              className="bg-gradient-to-br from-white/80 via-slate-100/80 to-white/60
             rounded-2xl p-8 shadow-2xl border border-white/40 backdrop-blur-md transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">{group.title}</h2>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => deleteGroup(group.title)}
                  title="Delete all tasks in this group"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <AnimatePresence>
                  {group.tasks.map((task) => (
                    <Task key={task.id} task={task} groupTitle={group.title} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
