from ai.llm import llm

response = llm.invoke(
    "Write a one-line description for a task called 'Learn FastAPI'."
)

print(response)