"use client";
import React from "react";

interface FilterBarProps {
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  categories: { id: number; name: string }[];
}

export default function FilterBar({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  categories,
}: FilterBarProps) {
  const resetFilters = () => {
    setPriorityFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortBy("");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
      <h2
        className="text-xl font-semibold text-blue-700 cursor-pointer hover:underline"
        onClick={resetFilters}
      >
        All Tasks
      </h2>

      <div className="flex flex-wrap gap-3">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="high">High (8-10)</option>
          <option value="medium">Medium (4-7)</option>
          <option value="low">Low (1-3)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">Sort By</option>
          <option value="priority">Priority</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
    </div>
  );
}
