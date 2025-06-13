import { TrashIcon, PencilIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useTaskGroupsContext } from "@/lib/hooks/use-task-groups";
import type { Task as TaskType } from "@/lib/tasks.types";
import { TaskStatus } from "@/lib/tasks.types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cardColors = [
  "bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 text-[#23263a]",
  "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-[#23263a]",
  "bg-gradient-to-br from-green-100 via-teal-100 to-green-200 text-[#23263a]",
  "bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 text-[#23263a]",
  "bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 text-[#23263a]",
];

export function Task({
  task,
  groupTitle,
}: {
  task: TaskType;
  groupTitle: string;
}) {
  const { deleteTask, setTaskStatus, editTask } =useTaskGroupsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const colorClass = cardColors[task.id % cardColors.length];

  const handleEdit = () => {
    if (editContent.trim()) {
      editTask(groupTitle, task.id, editContent.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "rounded-2xl p-6 flex flex-col gap-3 shadow-2xl border border-white/30 bg-white/80 backdrop-blur-md transition-all",
        colorClass
      )}
    >
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            className="font-bold text-lg truncate bg-transparent border-b border-gray-400 focus:outline-none"
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            autoFocus
          />
        ) : (
          <div
            className={cn(
              "font-bold text-lg truncate",
              task.status === TaskStatus.done && "line-through opacity-60"
            )}
          >
            {task.content}
          </div>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button onClick={handleEdit} title="Save">
                <CheckIcon className="w-5 h-5 text-green-600" />
              </button>
              <button onClick={() => setIsEditing(false)} title="Cancel">
                <XIcon className="w-5 h-5 text-gray-400" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} title="Edit">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(groupTitle, task.id)}
                title="Delete"
                className="hover:text-red-500"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={task.status === TaskStatus.done}
          onChange={() =>
            setTaskStatus(
              groupTitle,
              task.id,
              task.status === TaskStatus.done ? TaskStatus.todo : TaskStatus.done
            )
          }
        />
        <span className="text-xs">
          {task.status === TaskStatus.done ? "Done" : "Todo"}
        </span>
      </div>
      <div className="text-xs text-gray-500">
        {task.dateTime ? `⏰ ${new Date(task.dateTime).toLocaleString()}` : null}
      </div>
    </motion.div>
  );
}