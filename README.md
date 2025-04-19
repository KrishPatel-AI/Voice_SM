
![Logo]([https://drive.google.com/file/d/1UlNfa6vjC0B0OLQ5t8qmjhgJVjiZfSTp/view?usp=sharing](https://drive.google.com/file/d/1UlNfa6vjC0B0OLQ5t8qmjhgJVjiZfSTp/view?usp=sharing))


# VoiceSM

AI-Powered Voice Assistant on Realtime Stock Market Data and Give Analysis.


## Team Members

- [@KrishPatel-AI](https://github.com/KrishPatel-AI)
- [@vinit765](https://github.com/vinit765)
- [@Deeppjp116](https://github.com/Deeppjp116)
- [@rohan-genai](https://github.com/rohan-genai)



## Tech Stack we use:

**Client:** React, Next.js, Shadcn, TailwindCSS, Lucite React Icon, Recharts

**Server:** Python, Flask, Socket

**Tools, Services and API** Groq, Clerk, YFianance, ALpha Vantage 


## GitHub Clone

Clone our project to your local machine

```bash
git clone https://github.com/KrishPatel-AI/Voice_SM
```

## Installation

Installation of frontend packages or dependencies of our-project with npm
```bash
  cd VoiceSM
```
```bash
  cd frontend
```
```bash
  npm install
```
    
Installation of backend requirements of our-project with pip
```bash
  cd VoiceSM
```
```bash
  cd backend_py
```
```bash
  pip install -r requirements.txt
```
## Run Locally

After complete installation of frontend and backend packages or dependencies

Go to the frontend directory of project to run frontend

```bash
  cd Voice_SM
```
```bash
  cd frontend
```
```bash
  npm run dev
```

#### Open in your chrome browser:- [http://localhost:3000/](http://localhost:3000/)

Go to the backend directory of project to run backend in new terminal window (keep frontend run in another terminal window)

```bash
  cd Voice_SM
```
```bash
  cd backend_py
```
```bash
  python app.py
```
## FAQ

#### ❓ Why is the real-time stock market data not updating?
👉 Real-time stock data updates only when the respective stock market is open. If you're checking during a market holiday or after market hours, you'll see the last closing price instead of live updates.

💡 Tip: Refer to the official market holiday schedule to verify whether the stock exchange is open or closed on a given day.

#### ❓ Why isn’t the real-time market news visible sometimes?

👉 The real-time market news section is powered by an API that has a daily request limit of 25 calls.Once this limit is reached, further requests are paused until the next day.


