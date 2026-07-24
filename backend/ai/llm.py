# from langchain_huggingface import HuggingFaceEndpoint

# from config import settings

# llm = HuggingFaceEndpoint(
#     # repo_id="mistralai/Mistral-7B-Instruct-v0.3",
#     repo_id="meta-llama/Llama-3.2-3B-Instruct",
#     provider="fireworks-ai",
#     huggingfacehub_api_token=settings.HUGGING_FACE_ACCESS,
#     temperature=0.7,
#     max_new_tokens=256,
# )

from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

from config import settings

llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.2-3B-Instruct",
    # provider="fireworks-ai",
     provider="featherless-ai",
    huggingfacehub_api_token=settings.HUGGING_FACE_ACCESS,
    temperature=0.7,
    max_new_tokens=256,
)

llm = ChatHuggingFace(llm=llm)
