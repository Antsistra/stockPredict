// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from "@/context/ThemeContext";

interface TradingviewWidgetProps {
  symbol: string;
}

const TradingviewWidget = ({ symbol }: TradingviewWidgetProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Remove existing script
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        [
          `IDX:${symbol}|1D`
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "id",
      "colorTheme": isDarkMode ? "dark" : "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "medium",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol, isDarkMode]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
     
    </div>
  );
};

export default memo(TradingviewWidget);
