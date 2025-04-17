# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sock import Sock
import os

app = Flask(__name__)
CORS(app)
sock = Sock(app)

# Import tool modules
from tools.financial_assistant import init_financial_assistant
from tools.market_indices import init_market_indices
from tools.market_sector import init_market_sector
from tools.compare import init_compare
from tools.stock_search import init_stock_search
from tools.financial_news import init_financial_news

# Initialize tools
init_financial_assistant(app)
init_market_indices(app, sock)
init_market_sector(app)
init_compare(app)
init_stock_search(app)
init_financial_news(app)

@app.route('/health', methods=['GET'])
def health_check():
    """Main health check endpoint for the unified server"""
    return jsonify({
        "status": "ok", 
        "service": "unified-tools-server",
        "tools": ["financial_assistant", "market_indices", "market_sector","compare", "stock_search", "financial_news"]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)