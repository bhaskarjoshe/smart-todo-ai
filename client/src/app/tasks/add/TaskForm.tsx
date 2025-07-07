"use client";
import { Dispatch, SetStateAction } from "react";

interface TaskFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  categoryId: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
  categories: any[];
  isAddingNewCategory: boolean;
  setIsAddingNewCategory: Dispatch<SetStateAction<boolean>>;
  newCategoryName: string;
  setNewCategoryName: Dispatch<SetStateAction<string>>;
  handleAddCategory: () => Promise<void>;
}

export default function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  categoryId,
  setCategoryId,
  categories,
  isAddingNewCategory,
  setIsAddingNewCategory,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
}: TaskFormProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        className="border p-2 w-full mb-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {isAddingNewCategory ? (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            className="text-gray-500 text-sm hover:underline"
            onClick={() => {
              setNewCategoryName("");
              setIsAddingNewCategory(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <select
          value={categoryId}
          onChange={(e) => {
            if (e.target.value === "__add__") {
              setIsAddingNewCategory(true);
              return;
            }
            setCategoryId(e.target.value);
          }}
          className="border rounded p-2 w-full mb-2"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
          <option value="__add__">Others</option>
        </select>
      )}
    </>
  );
}
