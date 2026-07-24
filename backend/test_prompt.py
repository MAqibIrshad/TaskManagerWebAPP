from ai.chain import description_chain

response = description_chain.invoke({
    "title": "Learn FastAPI Authentication"
})

print(response)