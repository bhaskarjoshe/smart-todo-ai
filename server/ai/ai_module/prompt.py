def task_prompt(task, context_entries):
    context = "\n".join(
        f"-({entry['source']}) {entry['content']}" for entry in context_entries
    )

    return f"""
    You are an intelligent task assistant.

    Given the task:
    Title: {task['title']}
    Description: {task['description']}

    And this context:
    {context}

    Respond with:
    1. A priority score (1-10)
    2. A realistic suggested deadline (YYYY-MM-DDTHH:MM:SSZ)
    3. An improved, context-rich description
    4. A suggested category name
    Return the response as JSON only.
    """
