import TradingviewWidget from "@/components/fragments/TradingviewWidget";
import Navbar from "@/components/layouts/navbar";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchList";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import stockList from "@/constant/stockList.json";

import TickerTapeWidget from "@/components/fragments/TickerTapeWidget";
import HeatmapWidget from "@/components/fragments/HeatmapWidget";
import NewsList from "@/components/fragments/newsList";
import Footer from "@/components/layouts/Footer";

export default function DashboardPage() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: watchlist, isLoading, isError } = useWatchlist();
  const [filteredStocks, setFilteredStocks] = useState(stockList.stocks);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=saham&language=id&sortBy=publishedAt&apiKey=d2eba87d77a34b23854a44917a86e450"
      );
      const data = await response.json();
      setNews(data.articles);
      console.log(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Filter stocks based on search term
    const filtered = stockList.stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(value.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStocks(filtered);
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <>
      <div className="min-h-screen select-none bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-screen-xl mx-auto p-4">
          <Input
            type="text"
            placeholder="Search Stocks"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
          />

          {/* Display Search Results */}
          {searchTerm && (
            <div className="mt-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md absolute w-full">
              {filteredStocks.length > 0 ? (
                filteredStocks.slice(0, 5).map((stock: any) => (
                  <>
                    {" "}
                    <Link to={`/stock/${stock.symbol}`}>
                      <div className="p-2 mb-2 gap-y-2 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <p className="font-bold text-xl text-gray-900 dark:text-white">
                          {stock.symbol}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {stock.name}
                        </p>
                      </div>
                    </Link>
                  </>
                ))
              ) : (
                <p className="text-center text-lg text-gray-900 dark:text-white">
                  No stocks found
                </p>
              )}
            </div>
          )}
        </div>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="w-full h-[55vh] flex flex-col gap-y-4">
            <TradingviewWidget symbol="COMPOSITE" />
          </div>
          <div className="mt-4  hover:none">
            <TickerTapeWidget />
          </div>
          <div className="  lg:h-[40vh] mt-4  hover:none flex lg:flex-row flex-col gap-x-4 gap-y-4">
            <div className="lg:w-4/6 hidden lg:block">
              <HeatmapWidget />
            </div>
            <div className="lg:w-2/6">
              <NewsList />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Watchlist
            </h1>
          </div>
          {/* Handle Loading & Error State */}
          {isLoading && (
            <p className="text-center text-lg text-gray-900 dark:text-white">
              Loading watchlist...
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500">Error loading data</p>
          )}
          {!isLoading && !isError && watchlist && watchlist.length > 0 && (
            <div className="flex lg:flex-row flex-col gap-y-4 pb-8 gap-x-4 mt-4">
              {watchlist.slice(0, 4).map((stock: any) => (
                <Card
                  className="lg:w-1/4 bg-white dark:bg-gray-800"
                  key={stock.symbol}
                >
                  <Link to={`/stock/${stock.symbol}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stock.symbol}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {stock.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{`${stock.price}`}</p>
                      <p
                        className={
                          typeof stock.changePercent === "string" &&
                          stock.changePercent.startsWith("-")
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {stock.changePercent || "N/A"}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
          {!isLoading && !isError && watchlist && watchlist.length === 0 && (
            <p className="text-center text-lg mt-4 text-gray-900 dark:text-white">
              No stocks in your watchlist.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
