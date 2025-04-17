import requests
import os

API_KEY = os.environ.get("ALPHA_VANTAGE_API_KEY", "LDBWUDPEC8ODKC1X")
NEWS_URL = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&apikey={API_KEY}"


def get_market_news():
    """Fetch Market news from Alpha Vantage API"""
    response = requests.get(NEWS_URL)
    if response.status_code == 200:
        news_data = response.json().get("feed", [])
        simplified_news = [
            {
                "title": item.get("title"),
                "summary": item.get("summary"),
                "url": item.get("url"),
                "banner_image": item.get("banner_image"),
                "source": item.get("source"),
            }
            for item in news_data
        ]
        return simplified_news
    else:
        return {"error": "Failed to fetch news"}


def init_market_news(app):
    """Initialize Market news routes on the Flask app"""

    @app.route("/market-news")
    def market_news_endpoint():
        """Get Market news"""
        news = get_market_news()
        if "error" in news:
            return jsonify(news), 500
        return jsonify(news)

    @app.route("/market-news/health", methods=["GET"])
    def market_news_health():
        """Health check endpoint for the Market news tool"""
        return jsonify({"status": "ok", "service": "market-news"})

    print("✅ Market News tool initialized")


from flask import jsonify
