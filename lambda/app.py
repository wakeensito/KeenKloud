import os, json, time, urllib.request, datetime
import boto3

s3 = boto3.client("s3")

BUCKET   = os.environ["BUCKET"]
API_KEY  = os.environ["API_KEY"]
SYMBOLS  = [s.strip() for s in os.environ.get("SYMBOLS", "QQQ,CRWD,NVDA,AMZN").split(",")]
BASE_URL = "https://www.alphavantage.co/query"

def fetch_quote(symbol: str):
    # GLOBAL_QUOTE returns latest price + change %
    url = f"{BASE_URL}?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
    with urllib.request.urlopen(url, timeout=20) as r:
        data = json.loads(r.read().decode())

    q = data.get("Global Quote", {})
    if not q:
        # Fallback: return empty; caller can skip it
        return None

    price = float(q.get("05. price", "0") or 0)
    # "10. change percent" looks like "0.53%"
    chg_pct_str = (q.get("10. change percent", "0%") or "0%").strip().replace("%","")
    try:
        change_pct = float(chg_pct_str)
    except ValueError:
        change_pct = 0.0

    return {"symbol": symbol, "price": price, "change_pct": change_pct}

def handler(event, context):
    tickers = []

    for i, sym in enumerate(SYMBOLS):
        qt = fetch_quote(sym)
        if qt:
            tickers.append(qt)

        # Alpha Vantage free tier = 5 calls/min; be polite
        if i < len(SYMBOLS) - 1:
            time.sleep(13)  # ~4 symbols ≈ 39s total; set Lambda timeout to 60s

    payload = {
        "as_of": datetime.datetime.utcnow().isoformat(),
        "tickers": tickers
    }

    s3.put_object(
        Bucket=BUCKET,
        Key="market/current.json",
        Body=json.dumps(payload),
        ContentType="application/json",
        CacheControl="max-age=240"  # CDN can cache ~4 minutes
    )

    return {"ok": True, "count": len(tickers)}
