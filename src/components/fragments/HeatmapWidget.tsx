import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from "@/context/ThemeContext";

const HeatmapWidget = () => {
  const container = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Remove existing script
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "exchanges": [],
      "dataSource": "AllID",
      "grouping": "sector",
      "blockSize": "market_cap_basic",
      "blockColor": "change",
      "locale": "id",
      "symbolUrl": "",
      "colorTheme": isDarkMode ? "dark" : "light",
      "hasTopBar": false,
      "isDataSetEnabled": false,
      "isZoomEnabled": false,
      "hasSymbolTooltip": false,
      "isMonoSize": false,
      "width": "100%",
      "height": "100%"
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [isDarkMode]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      
    </div>
  );
};

export default memo(HeatmapWidget); 