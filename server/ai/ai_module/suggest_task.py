import json
import os
import re

import requests
from dotenv import load_dotenv

from .prompt import task_prompt

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = "mistralai/mistral-small-3.2-24b-instruct:free"


def call_openrouter_api(prompt):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful AI assistant for smart todo lists.",
            },
            {"role": "user", "content": prompt},
        ],
    }

    response = requests.post(OPENROUTER_API_URL, json=data, headers=headers)
    if response.status_code != 200:
        raise Exception(f"OpenRouter error: {response.status_code} - {response.text}")

    return response.json()["choices"][0]["message"]["content"]


def suggest_task(task, context_entries):
    prompt = task_prompt(task, context_entries)
    response = call_openrouter_api(prompt)

    cleaned = response.strip()
    if cleaned.startswith("```json"):
        cleaned = re.sub(r"^```json\s*", "", cleaned)
    if cleaned.endswith("```"):
        cleaned = re.sub(r"\s*```$", "", cleaned)

    return json.loads(cleaned)
