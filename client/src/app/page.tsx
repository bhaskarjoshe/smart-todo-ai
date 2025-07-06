"use client";
import { useEffect, useState } from "react";

const ROOT_API_URL = "http://localhost:8000/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(`${ROOT_API_URL}/tasks/`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    getTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded bg-white shadow">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">
              Priority: {task.priority_score}
            </p>
            <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            <p className="text-sm text-gray-500">
              Category: {task.category?.name || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
