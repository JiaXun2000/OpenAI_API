// require('dotenv').config({ path: __dirname + '/../.env' });
// console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

// const https = require('https');
// const axios = require('axios');

// const agent = new https.Agent({ family: 4 });
// const apiKey = process.env.OPENAI_API_KEY;
// const endpoint = 'https://api.openai.com/v1/chat/completions';

// const requestData = {
//   model: 'gpt-4',
//   messages: [
//     {
//       role: 'user',
//       content: 'What is the capital of France?'
//     }
//   ]
// };

// async function callOpenAI() {
//   try {
//     const response = await axios.post(endpoint, requestData, {
//       timeout: 30000,
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       httpsAgent: agent
//     });
//     console.log('Response from OpenAI:', response.data.choices[0].message.content);
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error);
//   }
// }

// callOpenAI();

require('dotenv').config({ path: __dirname + '/../.env' });
// console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

const https = require('https');
const axios = require('axios');
const readline = require('readline');

const agent = new https.Agent({ family: 4 });
const apiKey = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function callOpenAI(question) {
  // Construct request data and use user input as question content
  const requestData = {
    model: 'gpt-3.5-turbo', 
    messages: [
      {
        role: 'user',
        content: question
      }
    ]
  };

  try {
    const response = await axios.post(endpoint, requestData, {
      timeout: 30000, // Set timeout to 30 seconds
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent
    });
    console.log('Response from OpenAI:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

// Use the readline function to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入您的问题: ', (userInput) => {
  callOpenAI(userInput);
  rl.close();
});
