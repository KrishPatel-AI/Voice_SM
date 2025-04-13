// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Groq API configurations
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY is not set in environment variables!');
  process.exit(1);
}

const GROQ_MODEL = "llama-3.3-70b-chat"; // Using Llama 3.3 70B chat model

// Launch Python service
let pythonProcess;
let pythonReady = false;

function startPythonService() {
  console.log('Starting Python stock service...');
  
  // Use the correct path to the Python script
  const scriptPath = path.join(__dirname, 'services', 'stock_service.py');
  
  // Check if the file exists
  if (!fs.existsSync(scriptPath)) {
    console.error(`Python script not found at ${scriptPath}`);
    process.exit(1);
  }
  
  // Start the Python process
  pythonProcess = spawn('python', [scriptPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python service: ${data}`);
    if (data.toString().includes('Running on')) {
      pythonReady = true;
      console.log('Python service is ready!');
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python service error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python service exited with code ${code}`);
    pythonReady = false;
    if (code !== 0) {
      console.log('Attempting to restart Python service in 5 seconds...');
      setTimeout(startPythonService, 5000); // Restart if crashed
    }
  });
}

// Start the Python service
startPythonService();

// Custom system prompt for stock market assistant
const SYSTEM_PROMPT = `
You are an advanced stock market and financial assistant. 
Your goal is to provide accurate, up-to-date information about stocks and financial markets.

When discussing stocks:
- If you have real-time data available, use it to provide current prices and trends
- Present information in a clear, structured format
- Compare metrics when relevant
- Highlight significant changes or noteworthy movements
- Be objective and factual in your analysis
- When mentioning price changes, include both absolute value and percentage
- Use concise language but provide comprehensive insights

Please format numeric values appropriately:
- Use $ for USD currency values
- Present percentages with % symbol
- Use commas for thousands separators
- Round to 2 decimal places for prices and percentages

For all financial advice, remind users you're an AI and not a financial advisor.
`;

// Helper to create context-aware prompts
function createStockContextPrompt(userQuery, stockData) {
  if (!stockData || stockData.error) {
    return userQuery;
  }

  const stockContext = `
Here is the current data for ${stockData.company_name} (${stockData.ticker}):
- Current Price: $${stockData.current_price}
- Daily Change: $${stockData.change} (${stockData.change_percent}%)
- Open: $${stockData.open}
- High: $${stockData.high}
- Low: $${stockData.low}
- Volume: ${stockData.volume.toLocaleString()}
- Market Cap: ${typeof stockData.market_cap === 'number' ? '$' + stockData.market_cap.toLocaleString() : stockData.market_cap}

The 5-day closing prices:
${stockData.dates.map((date, i) => `- ${date}: $${stockData.trend[i].toFixed(2)}`).join('\n')}

Based on this real-time data, ${userQuery}
`;

  return stockContext;
}

// API endpoint to process text queries
app.post('/api/speech/text', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    console.log(`Received query: "${text}"`);

    const isStockQuery = /stock|price|market|share|ticker|investment|trading|nasdaq|nyse|dow|s&p|sp500|etf|fund|dividend|earnings|company|performance/i.test(text);

    let contextEnhancedPrompt = text;
    let stockData = null;

    // Only attempt to get stock data if Python service is ready
    if (isStockQuery && pythonReady) {
      try {
        console.log('Fetching stock data...');
        const stockResponse = await axios.post('http://localhost:5001/api/stock/info', { query: text });
        stockData = stockResponse.data;

        if (!stockData.error) {
          console.log(`Found stock data for ${stockData.ticker}`);
          contextEnhancedPrompt = createStockContextPrompt(text, stockData);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
      }
    }

    console.log('Sending request to Groq API...');
    try {
      const groqResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: contextEnhancedPrompt }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const assistantResponse = groqResponse.data.choices[0].message.content;
      console.log('Received response from Groq API');

      res.json({
        response: assistantResponse,
        stockData: stockData && !stockData.error ? stockData : null
      });
    } catch (error) {
      console.error('Error from Groq API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to get response from Groq API' });
    }

  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const status = {
    server: 'ok',
    python: pythonReady ? 'ok' : 'not ready',
    groq: GROQ_API_KEY ? 'configured' : 'not configured'
  };
  
  res.json({ status });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Shutting down...');
  if (pythonProcess) {
    pythonProcess.kill();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  if (pythonProcess) {
    pythonProcess.kill();
  }
  process.exit(0);
});