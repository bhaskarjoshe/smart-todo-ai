"use client";
import React from "react";

interface TaskCardProps {
  task: any;
  updateTaskStatus: (taskId: number, newStatus: string) => void;
  statusProgress: {
    [key: string]: { percent: number; color: string; label: string };
  };
}

export default function TaskCard({
  task,
  updateTaskStatus,
  statusProgress,
}: TaskCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-2xl">{task.title}</h3>
        <div className="flex gap-5 items-center">
          <div className="bg-gray-200 rounded-full h-2.5 w-50">
            <div
              className={`h-2.5 rounded-full ${
                statusProgress[task.status]?.color
              }`}
              style={{
                width: `${statusProgress[task.status]?.percent}%`,
              }}
            ></div>
          </div>
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <p className="text-gray-700">{task.description}</p>

      <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1 mt-2">
        <li>Priority: {task.priority_score}</li>
        <li>Deadline: {task.deadline}</li>
        <li>Category: {task.category?.name || "N/A"}</li>
      </ul>
    </div>
  );
}
