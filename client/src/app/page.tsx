"use client";
import FilterBar from "@/components/FilterBar";
import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";

export const ROOT_API_URL = "http://localhost:8000/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const statusProgress = {
    pending: { percent: 33, color: "bg-yellow-500", label: "Pending" },
    in_progress: { percent: 66, color: "bg-blue-500", label: "In Progress" },
    completed: { percent: 100, color: "bg-green-600", label: "Completed" },
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${ROOT_API_URL}/tasks/`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ROOT_API_URL}/categories/`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      const res = await fetch(`${ROOT_API_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update task status");

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (priorityFilter === "high" && task.priority_score < 8) return false;
      if (
        priorityFilter === "medium" &&
        (task.priority_score < 4 || task.priority_score > 7)
      )
        return false;
      if (priorityFilter === "low" && task.priority_score > 3) return false;

      if (statusFilter !== "all" && task.status !== statusFilter) return false;

      if (
        categoryFilter !== "all" &&
        task.category?.id?.toString() !== categoryFilter
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priority") return b.priority_score - a.priority_score;
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });

  return (
    <div>
      <FilterBar
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              statusProgress={statusProgress}
            />
          ))
        )}
      </div>
    </div>
  );
}
