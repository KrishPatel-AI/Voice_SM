"use client";
import { useEffect, useState } from "react";

interface IndexItem {
  symbol: string;
  name: string;
  price: number | string;
  change: number | string;
  region?: string;
}

interface IndexData {
  [region: string]: IndexItem[];
}

export default function useMarketIndices() {
  const [data, setData] = useState<IndexData>({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/ws");

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (err) {
        console.error("Error parsing market indices data", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return data;
}
