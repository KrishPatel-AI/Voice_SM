from flask import request, jsonify
import requests
import yfinance as yf
import re
import os
from datetime import datetime


GROQ_API_KEY = os.environ.get(
    "GROQ_API_KEY", "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"
)
GROQ_MODEL = "llama-3.1-8b-instant"  # Best model for our financial assistant use case

company_tickers = {
    "apple": "AAPL",
    "microsoft": "MSFT",
    "google": "GOOGL",
    "alphabet": "GOOGL",
    "amazon": "AMZN",
    "meta": "META",
    "facebook": "META",
    "tesla": "TSLA",
    "netflix": "NFLX",
    "nvidia": "NVDA",
    "intel": "INTC",
    "amd": "AMD",
    "paypal": "PYPL",
    "adobe": "ADBE",
    "uber": "UBER",
    "airbnb": "ABNB",
    "spotify": "SPOT",
    "zoom": "ZM",
    "salesforce": "CRM",
    "oracle": "ORCL",
    "qualcomm": "QCOM",
    "cisco": "CSCO",
    "boeing": "BA",
    "disney": "DIS",
    "pepsico": "PEP",
    "coca cola": "KO",
    "walmart": "WMT",
    "mcdonald's": "MCD",
    "starbucks": "SBUX",
    "nike": "NKE",
    "visa": "V",
    "mastercard": "MA",
    "pfizer": "PFE",
    "johnson & johnson": "JNJ",
    "moderna": "MRNA",
    "exxonmobil": "XOM",
    "chevron": "CVX",
    "lockheed martin": "LMT",
    "at&t": "T",
    "verizon": "VZ",
    "ibm": "IBM",
    "s&p 500": "^GSPC",
    "dow jones": "^DJI",
    "nasdaq": "^IXIC",
    "russell 2000": "^RUT",
    "reliance": "RELIANCE.NS",
    "tcs": "TCS.NS",
    "infosys": "INFY.NS",
    "hdfc bank": "HDFCBANK.NS",
    "icici bank": "ICICIBANK.NS",
    "hcl tech": "HCLTECH.NS",
    "kotak bank": "KOTAKBANK.NS",
    "sbi": "SBIN.NS",
    "l&t": "LT.NS",
    "itc": "ITC.NS",
    "asian paints": "ASIANPAINT.NS",
    "wipro": "WIPRO.NS",
    "ongc": "ONGC.NS",
    "bpcl": "BPCL.NS",
    "bharat electronics": "BEL.NS",
}


def extract_ticker(user_input):
    """Extract stock ticker from user input text"""
    user_input_lower = user_input.lower()

    for name, ticker in company_tickers.items():
        if name in user_input_lower:
            return ticker

    possible_tickers = re.findall(r"\b[A-Z]{1,5}\b", user_input)
    for ticker in possible_tickers:
        try:
            stock = yf.Ticker(ticker)
            if not stock.history(period="1d").empty:
                return ticker
        except:
            continue

    return None


def get_stock_data(ticker):
    """Get comprehensive stock data for a given ticker"""
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d")

        if data.empty:
            return None

        info = stock.info

        stock_data = {
            "ticker": ticker,
            "company_name": info.get("shortName", "Unknown"),
            "current_price": round(data["Close"].iloc[-1], 2),
            "currency": info.get("currency", "USD"),
            "change": round(data["Close"].iloc[-1] - data["Open"].iloc[0], 2),
            "change_percent": round(
                ((data["Close"].iloc[-1] / data["Open"].iloc[0]) - 1) * 100, 2
            ),
            "day_high": round(data["High"].max(), 2),
            "day_low": round(data["Low"].min(), 2),
            "volume": int(data["Volume"].sum()),
            "market_cap": info.get("marketCap", "Unknown"),
            "pe_ratio": info.get("trailingPE", "Unknown"),
            "sector": info.get("sector", "Unknown"),
            "industry": info.get("industry", "Unknown"),
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }

        return stock_data
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None


def format_stock_response(response_text):
    """Format the response to display stock data in a cleaner way"""

    cleaned_text = response_text.replace("**", "")

    def replace_percentage(match):
        percent_val = match.group(0)
        if "+" in percent_val:
            return percent_val
        elif "-" in percent_val:
            return percent_val
        return percent_val

    cleaned_text = re.sub(r"[\+\-]\d+\.\d+%", replace_percentage, cleaned_text)

    return cleaned_text


def query_groq_with_stock_data(query, stock_data=None):
    """Query Groq API with enhanced context if stock data available"""
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        system_message = """You are a professional financial advisor and stock market expert. 
        Provide accurate, helpful information about financial markets, stocks, and economic trends.
        When discussing stock data, present price increases with (+X.XX%) and decreases with (-X.XX%).
        Present data in a well-structured format that's easy to read.
        Avoid using symbols like *, **, or other markdown that might not display correctly in the UI.
        Keep responses concise but comprehensive and professional in tone.
        Use plain text formatting without any special markdown symbols."""

        if stock_data:
            change_prefix = "+" if stock_data["change"] >= 0 else ""
            percent_prefix = "+" if stock_data["change_percent"] >= 0 else ""

            context = f"""
            Current data for {stock_data['company_name']} ({stock_data['ticker']}):
            Price: ${stock_data['current_price']} {stock_data['currency']}
            Change: {change_prefix}{stock_data['change']} ({percent_prefix}{stock_data['change_percent']}%)
            Day Range: ${stock_data['day_low']} - ${stock_data['day_high']}
            Volume: {stock_data['volume']:,}
            Market Cap: ${stock_data['market_cap']:,} if isinstance(stock_data['market_cap'], (int, float)) else Unknown
            P/E Ratio: {stock_data['pe_ratio']}
            Sector: {stock_data['sector']}
            Industry: {stock_data['industry']}
            Last Updated: {stock_data['updated_at']}
            
            User query: {query}
            
            Provide a helpful analysis based on this real-time data. Format your response in plain text without using markdown symbols.
            """
            user_message = context
        else:
            user_message = query

        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ],
            "temperature": 0.5,
            "max_tokens": 800,
        }

        response = requests.post(url, headers=headers, json=payload)
        result = response.json()

        if "choices" in result and len(result["choices"]) > 0:
            response_text = result["choices"][0]["message"]["content"]

            formatted_response = format_stock_response(response_text)
            return formatted_response
        else:
            print("Unexpected response from Groq API:", result)
            return "I'm having trouble processing your request. Please try again."

    except Exception as e:
        print(f"Error querying Groq: {e}")
        return f"I encountered an error while processing your request. Please try again later."


def init_financial_assistant(app):
    """Initialize financial assistant routes on the Flask app"""

    @app.route("/api/speech/text", methods=["POST"])
    def process_speech():
        """Process speech text and return AI response with stock data if applicable"""
        if not request.json or "text" not in request.json:
            return jsonify({"error": "No text provided"}), 400

        query = request.json["text"]

        ticker = extract_ticker(query)

        if ticker:

            stock_data = get_stock_data(ticker)

            if stock_data:

                response = query_groq_with_stock_data(query, stock_data)
            else:
                response = f"I couldn't find current data for {ticker}. Please verify the ticker symbol or try a different query."
        else:

            response = query_groq_with_stock_data(query)

        return jsonify({"response": response})

    @app.route("/financial-assistant/health", methods=["GET"])
    def financial_assistant_health():
        """Health check endpoint for the financial assistant tool"""
        return jsonify({"status": "ok", "service": "groq-stock-assistant"})

    print("✅ Financial Assistant tool initialized")
