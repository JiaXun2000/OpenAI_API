require('dotenv').config({ path: __dirname + '/../.env' });
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: 'What is the capital of France?'
    }
  ]
};

async function callOpenAI() {
  try {
    const response = await axios.post(endpoint, requestData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Response from OpenAI:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

callOpenAI();
