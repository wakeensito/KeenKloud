# KeenKloud

A modern, serverless portfolio website with real-time market data integration — architected and deployed on AWS.

🌐 **Live Website**: [KeenKloud.net](https://keenkloud.net)

## 🚀 Features

- **Responsive & Fast** — mobile-first design, optimized with CDN delivery.
- **Real-Time Market Data** — stock quotes updated serverlessly through AWS Lambda + API integration.
- **Secure Architecture** — HTTPS enforced, AWS WAF protection, and least-privilege IAM.
- **Interactive Portfolio** — highlights projects and services with smooth animations and contact forms.
- **Automated Deployment** — CI/CD via GitHub Actions for zero-touch updates.

## 🛠️ Tech Stack

### Frontend:
HTML5 • CSS3 • JavaScript • Bootstrap 5 • AOS (animations) • Swiper.js • GLightbox

### Backend / Cloud:
AWS Lambda • Python (boto3) • Amazon S3 • CloudFront • Route 53 • OAC • WAF • ACM • Alpha Vantage API

### DevOps / Security:
GitHub Actions (CI/CD) • Policy-as-Code (least privilege IAM)

## 📂 Structure
```
KeenKloud/
├── assets/       # CSS, JS, images
├── lambda/       # AWS Lambda (market data fetcher)
├── market/       # Cached market data
├── forms/        # Contact form handlers
└── index.html    # Main homepage
```

## ⚡ Setup & Deployment

### Local:
1. Clone repo
2. Open `index.html` in browser

### AWS Lambda:
1. Package `lambda/app.py`
2. Set env variables: `BUCKET`, `API_KEY`, `SYMBOLS`
3. Deploy to AWS Lambda (60s timeout)
4. Update S3 + CloudFront for static hosting

## 🏆 Highlights

- **Architected** a secure, scalable AWS stack (S3 + CloudFront + Route 53 + WAF + ACM).
- **Automated** deployments with GitHub Actions CI/CD for instant updates.
- **Integrated** real-time market data via Alpha Vantage API with rate limiting.
- **Applied** security best practices: HTTPS everywhere & least-privilege IAM.

## 📞 Contact

For questions or collaboration, visit [KeenKloud.net](https://keenkloud.net)