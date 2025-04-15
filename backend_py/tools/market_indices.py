# tools/market_indices.py
import yfinance as yf
import json
import time

# Global Indices by Region
INDICES = {
    "Asia": [
        "^NSEI", "^BSESN", "^N225", "^HSI", "000001.SS", "^KS11", "^TWII", "^STI"
    ],
    "USA": [
        "^IXIC", "^GSPC", "^DJI", "^RUT", "^NYA"
    ],
    "Europe": [
        "^FTSE", "^GDAXI", "^FCHI", "^STOXX50E", "^IBEX", "^OMX", "^SSMI"
    ]
}

def fetch_index_data():
    data = {}
    for region, symbols in INDICES.items():
        data[region] = []
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                price = info['regularMarketPrice']
                change = info['regularMarketChangePercent']
                name = info.get('shortName', symbol)
                data[region].append({
                    "symbol": symbol,
                    "name": name,
                    "price": price,
                    "change": change
                })
            except Exception:
                data[region].append({
                    "symbol": symbol,
                    "name": symbol,
                    "price": "N/A",
                    "change": "N/A"
                })
    return data

def init_market_indices(app, sock):
    """Initialize market indices tool routes on the Flask app"""
    
    @sock.route('/ws')
    def dashboard(ws):
        while True:
            live_data = fetch_index_data()
            ws.send(json.dumps(live_data))
            time.sleep(1)
    
    @app.route('/market-indices/health', methods=['GET'])
    def market_indices_health():
        """Health check endpoint for the market indices tool"""
        return jsonify({"status": "ok", "service": "market-indices-websocket"})
    
    print("✅ Market Indices tool initialized")

# Import needed at the end to avoid circular import
from flask import jsonify