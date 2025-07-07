"use client";

import { useEffect, useState } from "react";
import { ROOT_API_URL } from "@/app/page";
import TaskForm from "./TaskForm";
import AILoader from "./AILoader";
import AISuggestionCard from "./AISuggestionCard";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [taskAdded, setTaskAdded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${ROOT_API_URL}/categories/`);
        if (!res.ok) throw new Error("Failed to fetch categories.");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleAISuggestion = async () => {
    if (!title.trim()) {
      alert("Title is required to get AI suggestions.");
      return;
    }

    setIsLoading(true);
    setSuggestion(null);
    setTaskAdded(false);

    try {
      const res = await fetch(`${ROOT_API_URL}/ai/suggest/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: { title, description, category_id: categoryId },
          context: [],
        }),
      });

      if (!res.ok) throw new Error("Failed to get AI suggestion.");

      const data = await res.json();
      setSuggestion(data);
    } catch (err) {
      console.error("Error getting AI suggestion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch(`${ROOT_API_URL}/categories/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const data = await res.json();
      setCategories((prev) => [...prev, data]);
      setCategoryId(data.id);
      setNewCategoryName("");
      setIsAddingNewCategory(false);
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  const handleAddSuggestedTask = async () => {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!suggestion) {
      alert("Please generate AI suggestions first.");
      return;
    }

    try {
      const finalDescription = description.trim()
        ? description
        : suggestion.improved_description;

      const finalCategoryName = suggestion.suggested_category?.trim();
      let finalCategoryId = categoryId;

      if (!categoryId && finalCategoryName) {
        const matchedCategory = categories.find(
          (c) => c.name.toLowerCase() === finalCategoryName.toLowerCase()
        );

        if (matchedCategory) {
          finalCategoryId = matchedCategory.id;
        } else {
          const createRes = await fetch(`${ROOT_API_URL}/categories/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: finalCategoryName }),
          });

          if (!createRes.ok) {
            const error = await createRes.text();
            throw new Error("Failed to create category: " + error);
          }

          const createdCategory = await createRes.json();
          finalCategoryId = createdCategory.id;
          setCategories((prev) => [...prev, createdCategory]);
        }
      }

      if (!finalCategoryId) {
        alert("No valid category found. Please select or add one.");
        return;
      }

      const res = await fetch(`${ROOT_API_URL}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: finalDescription,
          category_id: finalCategoryId,
          priority_score: suggestion.priority_score,
          deadline: suggestion.suggested_deadline,
          status: "pending",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }

      setTaskAdded(true);
    } catch (err) {
      console.error("Error adding suggested task:", err);
      alert("Failed to add task. Check console for details.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>

      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        isAddingNewCategory={isAddingNewCategory}
        setIsAddingNewCategory={setIsAddingNewCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
      />

      <button
        onClick={handleAISuggestion}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition shadow  cursor-pointer"
      >
        Get AI Suggestions
      </button>

      {isLoading && <AILoader />}

      {suggestion && !isLoading && (
        <AISuggestionCard
          suggestion={suggestion}
          taskAdded={taskAdded}
          onAdd={handleAddSuggestedTask}
        />
      )}
    </div>
  );
}
