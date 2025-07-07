"use client";

import { useEffect, useState } from "react";
import { ROOT_API_URL } from "../page";

export default function ContextPage() {
  const [context, setContext] = useState("");
  const [source, setSource] = useState("email");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await fetch(`${ROOT_API_URL}/context/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: context, source }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Failed to add context.");
      }

      setContext("");
      fetchEntries();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  const fetchEntries = async () => {
    setError("");
    try {
      const res = await fetch(`${ROOT_API_URL}/context/`);
      if (!res.ok) throw new Error("Failed to fetch context entries.");
      const data = await res.json();
      setEntries(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daily Context</h2>

      {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        className="border p-2 w-full mb-2 rounded "
        placeholder="Enter context message"
      />
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="email">Email</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="note">Note</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Context
      </button>

      <div className="mt-6 space-y-3">
        {entries.map((entry: any) => (
          <div key={entry.id} className="p-3 border bg-white rounded shadow">
            <p className="text-sm text-gray-700">{entry.content}</p>
            <p className="text-xs text-gray-500">
              Source: {entry.source} |{" "}
              {new Date(entry.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
