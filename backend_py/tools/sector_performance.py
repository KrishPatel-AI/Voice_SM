# tools/sector_performance.py
import yfinance as yf
from datetime import datetime

# Expanded sector ETFs mapping with S&P 500 sectors
sector_etfs = {
    "All Sectors": "SPY",
    "Technology": "XLK",
    "Financial Services": "XLF", 
    "Consumer Cyclical": "XLY",
    "Healthcare": "XLV",
    "Communication Services": "XLC",
    "Industrials": "XLI",
    "Consumer Defensive": "XLP",
    "Energy": "XLE",
    "Basic Materials": "XLB",
    "Real Estate": "XLRE",
    "Utilities": "XLU"
}

# Approximate market weights (will be updated with real-time data)
sector_weights = {
    "All Sectors": 100.00,
    "Technology": 27.50,
    "Financial Services": 15.92,
    "Consumer Cyclical": 10.58,
    "Healthcare": 10.23,
    "Communication Services": 9.12,
    "Industrials": 8.46,
    "Consumer Defensive": 6.12,
    "Energy": 4.40,
    "Basic Materials": 2.58,
    "Real Estate": 2.58,
    "Utilities": 2.49
}

def get_sector_data():
    data = []
    
    # Get current date and start of year
    now = datetime.now()
    start_of_year = datetime(now.year, 1, 1)
    
    for sector, ticker in sector_etfs.items():
        stock = yf.Ticker(ticker)
        
        # Get intraday data
        intraday_hist = stock.history(period="1d", interval="1m")
        
        # Get daily data (for previous day comparison)
        daily_hist = stock.history(period="2d")
        
        # Get YTD data
        ytd_hist = stock.history(start=start_of_year, end=now)
        
        if not intraday_hist.empty and not daily_hist.empty and len(daily_hist) >= 2 and not ytd_hist.empty:
            # Calculate intraday change
            current_price = intraday_hist['Close'].iloc[-1]
            open_price = intraday_hist['Open'].iloc[0]
            intraday_change = round(((current_price - open_price) / open_price) * 100, 2)
            
            # Calculate daily change (current vs previous day close)
            today_close = daily_hist['Close'].iloc[-1]
            prev_close = daily_hist['Close'].iloc[-2]
            daily_change = round(((today_close - prev_close) / prev_close) * 100, 2)
            
            # Calculate YTD change
            ytd_start_price = ytd_hist['Open'].iloc[0]
            ytd_change = round(((current_price - ytd_start_price) / ytd_start_price) * 100, 2)
            
            data.append({
                "sector": sector,
                "change": intraday_change,
                "dailyChange": daily_change,
                "ytdChange": ytd_change,
                "weight": sector_weights[sector]
            })
    
    # Sort sectors by weight (descending)
    data = sorted(data, key=lambda x: x["weight"], reverse=True)
    
    return data

def init_sector_performance(app):
    """Initialize sector performance routes on the Flask app"""
    
    @app.route('/api/sectors')
    def sectors_endpoint():
        """Get sector performance data"""
        data = get_sector_data()
        return jsonify(data)
    
    @app.route('/sector-performance/health', methods=['GET'])
    def sector_performance_health():
        """Health check endpoint for the sector performance tool"""
        return jsonify({"status": "ok", "service": "sector-performance"})
    
    print("✅ Sector Performance tool initialized")

# Import needed at the end to avoid circular import
from flask import jsonify