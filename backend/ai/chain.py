from langchain_core.output_parsers import StrOutputParser

from ai.llm import llm
from ai.prompt import description_prompt

description_chain = (
    description_prompt
    | llm
    | StrOutputParser()
)