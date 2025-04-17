import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const TickerTapeWidget = () => {
  const container = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Remove existing script
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: "",
          proName: "IDX:BMRI"
        },
        {
          description: "",
          proName: "IDX:BBRI"
        },
     
        {
          description: "",
          proName: "IDX:ANTM"
        },
        {
          description: "",
          proName: "IDX:PGAS"
        },
        {
          description: "",
          proName: "IDX:GOTO"
        },
        {
          description: "",
          proName: "IDX:ADMR"
        },
        {
          description: "",
          proName: "IDX:TLKM"
        }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: isDarkMode ? "dark" : "light",
      locale: "id"
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
    <div className="relative">
      <div className="tradingview-widget-container pointer-events-none">
        <div className="tradingview-widget-container__widget" ref={container}></div>
       
      </div>
      <div className="absolute inset-0 z-10" />
    </div>
  );
};

export default TickerTapeWidget; 