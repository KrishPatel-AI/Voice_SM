# tools/market_indices.py
import yfinance as yf
import json
import time

# Global Indices by Region - Prioritizing Indian Markets
INDICES = {
    "India": [
        "^NSEI",    # Nifty 50
        "^BSESN",   # Sensex
        "NIFTYMIDCAP150.NS",  # Nifty Midcap 150
        "NIFTYBANK.NS",       # Nifty Bank
        "NIFTYIT.NS",         # Nifty IT
        "CNXPHARMA.NS"        # Nifty Pharma
    ],
    "Asia": [
        "^N225",    # Nikkei 225
        "^HSI",     # Hang Seng
        "000001.SS", # Shanghai Composite
        "^KS11",    # KOSPI
        "^TWII",    # Taiwan Weighted
        "^STI"      # Straits Times Index
    ],
    "USA": [
        "^GSPC",    # S&P 500
        "^IXIC",    # NASDAQ
        "^DJI",     # Dow Jones
        "^RUT",     # Russell 2000
        "^VIX"      # Volatility Index
    ],
    "Europe": [
        "^FTSE",    # FTSE 100
        "^GDAXI",   # DAX
        "^FCHI",    # CAC 40
        "^STOXX50E" # EURO STOXX 50
    ]
}

# Mapping for better display names
INDEX_NAMES = {
    "^NSEI": "Nifty 50",
    "^BSESN": "BSE Sensex",
    "NIFTYMIDCAP150.NS": "Nifty Midcap 150",
    "NIFTYBANK.NS": "Nifty Bank",
    "NIFTYIT.NS": "Nifty IT",
    "CNXPHARMA.NS": "Nifty Pharma"
}

def fetch_index_data():
    data = {}
    for region, symbols in INDICES.items():
        data[region] = []
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                price = info.get('regularMarketPrice', 'N/A')
                change = info.get('regularMarketChangePercent', 'N/A')
                # Use our mapping if available, otherwise get from API or use symbol
                name = INDEX_NAMES.get(symbol, info.get('shortName', symbol))
                
                data[region].append({
                    "symbol": symbol,
                    "name": name,
                    "price": price,
                    "change": change
                })
                # Add a small delay to avoid hitting rate limits
                time.sleep(0.2)
            except Exception as e:
                print(f"Error fetching {symbol}: {str(e)}")
                data[region].append({
                    "symbol": symbol,
                    "name": INDEX_NAMES.get(symbol, symbol),
                    "price": "N/A",
                    "change": "N/A"
                })
    return data

def init_market_indices(app, sock):
    """Initialize market indices tool routes on the Flask app"""
    
    @sock.route('/ws/market-indices')
    def dashboard(ws):
        """WebSocket endpoint for streaming real-time market indices data"""
        try:
            while True:
                live_data = fetch_index_data()
                ws.send(json.dumps(live_data))
                # Refresh every 10 seconds to avoid excessive API calls
                time.sleep(10)
        except Exception as e:
            print(f"WebSocket error: {str(e)}")
    
    @app.route('/market-indices/data', methods=['GET'])
    def get_market_indices():
        """REST endpoint to fetch market indices data once"""
        try:
            data = fetch_index_data()
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @app.route('/market-indices/health', methods=['GET'])
    def market_indices_health():
        """Health check endpoint for the market indices tool"""
        return jsonify({"status": "ok", "service": "market-indices-websocket"})
    
    print("✅ Market Indices tool initialized with focus on Indian markets")

# Import needed at the end to avoid circular import
from flask import jsonify