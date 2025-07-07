import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AISuggestionCard({
  suggestion,
  taskAdded,
  onAdd,
}: {
  suggestion: any;
  taskAdded: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <p><strong>Priority:</strong> {suggestion.priority_score}</p>
      <p><strong>Suggested Deadline:</strong> {suggestion.suggested_deadline}</p>
      <p><strong>Description:</strong> {suggestion.improved_description}</p>
      <p><strong>Suggested Category:</strong> {suggestion.suggested_category}</p>

      {taskAdded ? (
        <div className="flex items-center gap-2 mt-3 text-green-600 font-semibold">
          <CheckCircleIcon className="h-6 w-6" />
          Task added successfully!
        </div>
      ) : (
        <button
          onClick={onAdd}
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add This Task
        </button>
      )}
    </div>
  );
}
