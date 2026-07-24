from langchain_core.prompts import PromptTemplate

description_prompt = PromptTemplate.from_template(
    """
You are an expert productivity assistant.

Generate a concise and professional task description.

Task Title:
{title}

Requirements:
- Maximum 3 sentences.
- Be specific.
- Do not use bullet points.
- Return only the description.
"""
)