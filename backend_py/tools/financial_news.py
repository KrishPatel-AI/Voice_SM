# tools/financial_news.py
import requests
import os

# Configure API key - should be in environment variable in production
API_KEY = os.environ.get('ALPHA_VANTAGE_API_KEY', 'LDBWUDPEC8ODKC1X')
NEWS_URL = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&apikey={API_KEY}'

def get_financial_news():
    """Fetch financial news from Alpha Vantage API"""
    response = requests.get(NEWS_URL)
    if response.status_code == 200:
        news_data = response.json().get('feed', [])
        simplified_news = [
            {
                'title': item.get('title'),
                'summary': item.get('summary'),
                'url': item.get('url'),
                'banner_image': item.get('banner_image'),
                'source': item.get('source')
            }
            for item in news_data
        ]
        return simplified_news
    else:
        return {'error': 'Failed to fetch news'}

def init_financial_news(app):
    """Initialize financial news routes on the Flask app"""
    
    @app.route('/financial-news')
    def financial_news_endpoint():
        """Get financial news"""
        news = get_financial_news()
        if 'error' in news:
            return jsonify(news), 500
        return jsonify(news)
    
    @app.route('/financial-news/health', methods=['GET'])
    def financial_news_health():
        """Health check endpoint for the financial news tool"""
        return jsonify({"status": "ok", "service": "financial-news"})
    
    print("✅ Financial News tool initialized")

# Import needed at the end to avoid circular import
from flask import jsonify