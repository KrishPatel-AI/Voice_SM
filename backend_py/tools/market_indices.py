import yfinance as yf
import json
import time

INDICES = {
    "India": [
        "^NSEI",
        "^BSESN",
        "NIFTYMIDCAP150.NS",
        "NIFTYBANK.NS",
        "NIFTYIT.NS",
        "CNXPHARMA.NS",
    ],
    "Asia": ["^N225", "^HSI", "000001.SS", "^KS11", "^TWII", "^STI"],
    "USA": [
        "^GSPC",
        "^IXIC",
        "^DJI",
        "^RUT",
        "^VIX",
    ],
    "Europe": [
        "^FTSE",
        "^GDAXI",
        "^FCHI",
        "^STOXX50E",
    ],
}


INDEX_NAMES = {
    "^NSEI": "Nifty 50",
    "^BSESN": "BSE Sensex",
    "NIFTYMIDCAP150.NS": "Nifty Midcap 150",
    "NIFTYBANK.NS": "Nifty Bank",
    "NIFTYIT.NS": "Nifty IT",
    "CNXPHARMA.NS": "Nifty Pharma",
}


def fetch_index_data():
    data = {}
    for region, symbols in INDICES.items():
        data[region] = []
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                price = info.get("regularMarketPrice", "N/A")
                change = info.get("regularMarketChangePercent", "N/A")

                name = INDEX_NAMES.get(symbol, info.get("shortName", symbol))

                data[region].append(
                    {"symbol": symbol, "name": name, "price": price, "change": change}
                )

                time.sleep(0.2)
            except Exception as e:
                print(f"Error fetching {symbol}: {str(e)}")
                data[region].append(
                    {
                        "symbol": symbol,
                        "name": INDEX_NAMES.get(symbol, symbol),
                        "price": "N/A",
                        "change": "N/A",
                    }
                )
    return data


def init_market_indices(app, sock):
    """Initialize market indices tool routes on the Flask app"""

    @sock.route("/ws/market-indices")
    def dashboard(ws):
        """WebSocket endpoint for streaming real-time market indices data"""
        try:
            while True:
                live_data = fetch_index_data()
                ws.send(json.dumps(live_data))

                time.sleep(10)
        except Exception as e:
            print(f"WebSocket error: {str(e)}")

    @app.route("/market-indices/data", methods=["GET"])
    def get_market_indices():
        """REST endpoint to fetch market indices data once"""
        try:
            data = fetch_index_data()
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route("/market-indices/health", methods=["GET"])
    def market_indices_health():
        """Health check endpoint for the market indices tool"""
        return jsonify({"status": "ok", "service": "market-indices-websocket"})

    print("✅ Market Indices tool initialized with focus on Indian markets")


from flask import jsonify
