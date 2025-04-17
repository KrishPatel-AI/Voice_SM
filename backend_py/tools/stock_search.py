# backend_py/tools/stock_search.py
from flask import request, jsonify
import yfinance as yf
import requests
from bs4 import BeautifulSoup
import json
import time
import concurrent.futures

def init_stock_search(app):
    # Cache for search results to reduce API calls
    search_cache = {}
    cache_expiry = 300  # 5 minutes

    @app.route('/api/search/stocks', methods=['GET'])
    def search_stocks():
        query = request.args.get('query', '')
        
        if not query or len(query) < 1:
            return jsonify([])
        
        # Check cache first
        cache_key = query.lower()
        current_time = time.time()
        if cache_key in search_cache and (current_time - search_cache[cache_key]['timestamp'] < cache_expiry):
            return jsonify(search_cache[cache_key]['results'])
        
        try:
            # Use Yahoo Finance API for searching stocks
            url = f"https://query2.finance.yahoo.com/v1/finance/search?q={query}&quotesCount=8&newsCount=0"
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            response = requests.get(url, headers=headers)
            
            if response.status_code != 200:
                return jsonify([]), 500
            
            data = response.json()
            
            # Process the results
            equity_symbols = []
            results = []
            
            for quote in data.get('quotes', []):
                # Filter for stocks only
                if quote.get('quoteType') == 'EQUITY':
                    symbol = quote.get('symbol')
                    equity_symbols.append({
                        'symbol': symbol,
                        'name': quote.get('shortname') or quote.get('longname') or symbol,
                        'exchange': quote.get('exchange') or 'Unknown'
                    })
            
            # Function to get real-time price data for a symbol
            def get_price_data(stock_info):
                symbol = stock_info['symbol']
                try:
                    # Get latest price and change
                    ticker = yf.Ticker(symbol)
                    # Get intraday data if available, otherwise use daily
                    history = ticker.history(period="1d", interval="1m")
                    
                    if not history.empty:
                        latest_price = history['Close'].iloc[-1]
                        
                        # Calculate change
                        if len(history) > 1:
                            open_price = history['Open'].iloc[0]
                            change_percent = ((latest_price - open_price) / open_price) * 100
                        else:
                            # Fall back to daily data if intraday has only one point
                            daily = ticker.history(period="2d")
                            if len(daily) > 1:
                                prev_close = daily['Close'].iloc[-2]
                                change_percent = ((latest_price - prev_close) / prev_close) * 100
                            else:
                                change_percent = 0
                                
                        stock_info['price'] = round(float(latest_price), 2)
                        stock_info['change'] = round(float(change_percent), 2)
                    
                    return stock_info
                except Exception as e:
                    print(f"Error getting price for {symbol}: {e}")
                    return stock_info
            
            # Get price data in parallel for faster response
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                results = list(executor.map(get_price_data, equity_symbols))
            
            # Save to cache
            search_cache[cache_key] = {
                'timestamp': current_time,
                'results': results
            }
            
            return jsonify(results)
        
        except Exception as e:
            print(f"Error in stock search: {e}")
            return jsonify([]), 500