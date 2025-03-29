// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Cek apakah script sudah ada sebelumnya
    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "autosize": true,
                 "symbol": "IDX:${symbol}",
          "timezone": "Asia/Jakarta",
        "interval": "D",
        "timezone": "Asia/Jakarta",
        "theme": "light",
        "style": "3",
        "locale": "en",
        "allow_symbol_change": true,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;
      container.current?.appendChild(script);
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
