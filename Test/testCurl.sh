#!/bin/bash

# Load variables in the .env environment
if [ -f ../.env ]; then
  echo "Loading environment variables from ../.env..."
  export $(grep -v '^#' ../.env | xargs)
else
  echo "No .env file found in the parent directory."
fi

# Check if OPENAI_API_KEY has been set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Error: OPENAI_API_KEY is not set. Please set it in your .env file."
  exit 1
fi

# Define API endpoints, models, and request prompt content
ENDPOINT="https://api.openai.com/v1/chat/completions"
MODEL="gpt-3.5-turbo" 
PROMPT="Write a haiku about recursion in programming."

# Send a POST request using curl
curl -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "'"${MODEL}"'",
    "messages": [
      { "role": "developer", "content": "You are a helpful assistant." },
      { "role": "user", "content": "'"${PROMPT}"'" }
    ]
  }'
