from flask import request, jsonify
import yfinance as yf
from datetime import datetime, timedelta

def init_compare(app):
    @app.route('/api/compare/history', methods=['GET'])
    def get_comparison_history():
        symbols = request.args.getlist('symbols')
        period = request.args.get('period', '1mo')

        data = {}
        for symbol in symbols:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period=period)
            hist.reset_index(inplace=True)
            data[symbol] = hist[['Date', 'Close', 'Volume']].to_dict(orient='records')

        return jsonify(data)

    @app.route('/api/compare/metrics', methods=['GET'])
    def get_comparison_metrics():
        symbols = request.args.getlist('symbols')

        metrics = {}
        for symbol in symbols:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            metrics[symbol] = {
                'marketCap': info.get('marketCap'),
                'peRatio': info.get('trailingPE'),
                'eps': info.get('trailingEps'),
                'dividendYield': info.get('dividendYield'),
                'beta': info.get('beta'),
                '52WeekHigh': info.get('fiftyTwoWeekHigh'),
                '52WeekLow': info.get('fiftyTwoWeekLow'),
            }

        return jsonify(metrics)
