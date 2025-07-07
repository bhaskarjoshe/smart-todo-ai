def task_prompt(task, context_entries):
    context = "\n".join(
        f"-({entry['source']}) {entry['content']}" for entry in context_entries
    )

    description = task.get("description", "").strip()
    needs_description = not description

    prompt = f"""
You are an intelligent assistant helping users manage their tasks based on the task title and context.

Task Information:
Title: {task['title']}
{"Description: " + description if description else "Description: [Missing] — Please infer a detailed and meaningful description."}

Daily Context:
{context if context else "No context provided."}

Instructions:
Based on the information above, return the following fields in a well-formatted JSON object:
1. "priority_score": (Integer from 1 to 10, where 10 is most urgent)
2. "suggested_deadline": (A realistic ISO8601 UTC deadline in format YYYY-MM-DDTHH:MM:SSZ)
3. "improved_description": (Improved or inferred task description using title and context)
4. "suggested_category": (Short, meaningful category name)

Output Format:
```json
{{
  "priority_score": 7,
  "suggested_deadline": "2025-07-15T17:00:00Z",
  "improved_description": "Your detailed improved or inferred description here.",
  "suggested_category": "Your suggested category here"
}}```
Only return valid JSON. Do not include explanations or any other text.
""".strip()

    return prompt
