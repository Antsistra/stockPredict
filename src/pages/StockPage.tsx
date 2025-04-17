import React, { useEffect } from "react";
import TradingviewWidget from "@/components/fragments/TradingviewWidget";
import Navbar from "@/components/layouts/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { axiosInstance } from "@/lib/axios";
import { useParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/layouts/Footer";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockList {
  id: string;
  name: string;
  stocks: Stock[];
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)} T`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)} M`;
  }
  return value.toString();
}

export default function StockPage() {
  const [news, setNews] = useState<any>(null);
  const [stockData, setStockData] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<boolean | null>(null);
  const { symbol } = useParams<{ symbol: string }>();
  const [selectedList, setSelectedList] = useState<string>("watchlist");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lists, setLists] = useState<StockList[]>([]);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newStockSymbol, setNewStockSymbol] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  const newList = (name: string) => {
    const list: StockList = {
      id: Date.now().toString(),
      name,
      stocks: [],
    };
    setLists((prev) => [...prev, list]);
    return list;
  };

  const addStockToList = (listId: string, stock: Stock) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, stocks: [...list.stocks, stock] } : list
      )
    );
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/stock/news/${symbol}.JK`);
      console.log("News data:", response.data);
      setNews(response.data);
    } catch (error) {
      console.log("Error fetching news data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/stocks/details/${symbol}`);
      setStockData(response.data);
      console.log("Stock data:", response.data);
    } catch (error) {
      console.log("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPrediction = async () => {
    try {
      const response = await axiosInstance.get(`/api/prediction/${symbol}`);

      setPredictionData(response.data);
      console.log("Prediction data:", predictionData);
    } catch (error) {
      console.log("Error fetching prediction data:", error);
    }
  };

  useEffect(() => {
    fetchPrediction();
    fetchDetails();
    fetchNews();
  }, [symbol]);
  const handleAddToWatchlist = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("watchlist").insert({
        stock_symbol: symbol,
      });
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonText: "OK",
        });
        console.error("Error adding to watchlist:", error.message);
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added to watchlist",
          confirmButtonText: "OK",
        });
        console.log("Added to watchlist:", data);
      }
      setStocks(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckWatchlist = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data?.user) {
      console.error("User not authenticated");
      return;
    }
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("stock_symbol", symbol)
      .eq("userId", user.data.user.id);
    if (error) {
      console.error("Error fetching watchlist:", error.message);
    } else {
      if (data.length > 0) {
        setStocks(true);
      } else {
        setStocks(false);
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    setLoading(true);
    try {
      const user = await supabase.auth.getUser();
      if (!user.data?.user) {
        console.error("User not authenticated");
        return;
      }
      const { data, error } = await supabase
        .from("watchlist")
        .delete()
        .eq("stock_symbol", symbol)
        .eq("userId", user.data.user.id);
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonText: "OK",
        });
        console.error("Error removing from watchlist:", error.message);
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Removed from watchlist",
          confirmButtonText: "OK",
        });
        setStocks(false);
        console.log("Removed from watchlist:", data);
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    handleCheckWatchlist();
  }, [symbol]);

  return (
    <>
      <div className="min-h-screen select-none bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-screen-xl mx-auto p-4 flex mt-4">
          <div className="w-full flex flex-col lg:flex-row gap-x-4">
            <div className="lg:w-4/6">
              <div className="h-[53vh] ">
                <TradingviewWidget symbol={symbol || "Composite"} />
              </div>
              <div className="flex p-8 lg:p-12 w-full border-2 bg-white dark:bg-gray-800 shadow-md lg:h-40 mt-4 justify-between rounded-3xl">
                {stockData ? (
                  <>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p className="text-gray-600 dark:text-gray-300">
                        Market Cap
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatMarketCap(stockData.marketCap)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p className="text-gray-600 dark:text-gray-300">
                        52W High
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {stockData.fiftyTwoWeekHigh}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p className="text-gray-600 dark:text-gray-300">
                        52W Low
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {stockData.fiftyTwoWeekLow}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p className="text-gray-600 dark:text-gray-300">PBV</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {stockData.priceToBook?.toFixed(2)}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-lg text-gray-900 dark:text-white">
                    Loading stock data...
                  </p>
                )}
              </div>
            </div>
            <div className="lg:w-2/6 lg:h-[79vh] max-w-screen-xl mt-8 lg:mt-0 rounded-3xl flex flex-col">
              {stocks === null ? (
                <p className="mt-12 mb-4 text-center text-gray-900 dark:text-white">
                  Loading...
                </p>
              ) : stocks ? (
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Watchlist
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      This stock is in your watchlist
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleRemoveFromWatchlist}
                      className="w-full bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                    >
                      Remove from Watchlist
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Watchlist
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Add this stock to your watchlist
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleAddToWatchlist}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    >
                      Add to Watchlist
                    </Button>
                  </CardContent>
                </Card>
              )}

              <h1 className="font-bold text-2xl mb-4 mt-4 ">AI Prediction</h1>
              <div className="flex flex-col gap-y-4">
                {predictionData && predictionData.shortTerm ? (
                  <div className="w-full bg-white dark:bg-gray-800 border-2 p-4 rounded-lg">
                    <p>Short Term Forecast (7 Days)</p>
                    <p>Confidence Score</p>
                    <div className="flex justify-center items-center gap-x-4">
                      <Progress
                        value={parseFloat(
                          (
                            Number(
                              predictionData.shortTerm.accuracy.correlation
                            ) * 100
                          ).toFixed(0)
                        )}
                      />
                      <p>
                        {(
                          Number(
                            predictionData.shortTerm.accuracy.correlation
                          ) * 100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("id-ID").format(
                        predictionData.shortTerm.predictedPrice.toFixed(0)
                      )}
                    </p>
                  </div>
                ) : (
                  <p>Loading Short Term Prediction...</p>
                )}

                {/* Mid Term Prediction */}
                {predictionData && predictionData.midTerm ? (
                  <div className="w-full bg-white dark:bg-gray-800 border-2 p-4 rounded-lg">
                    <p>Mid Term Forecast (20 Days)</p>
                    <p>Confidence Score</p>
                    <div className="flex justify-center items-center gap-x-4">
                      <Progress
                        value={parseFloat(
                          (
                            Number(
                              predictionData.midTerm.accuracy.correlation
                            ) * 100
                          ).toFixed(0)
                        )}
                      />
                      <p>
                        {(
                          Number(predictionData.midTerm.accuracy.correlation) *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("id-ID").format(
                        predictionData.midTerm.predictedPrice.toFixed(0)
                      )}
                    </p>
                  </div>
                ) : (
                  <p>Loading Mid Term Prediction...</p>
                )}

                {/* Long Term Prediction */}
                {predictionData && predictionData.longTerm ? (
                  <div className="w-full bg-white dark:bg-gray-800 border-2 p-4 rounded-lg">
                    <p>Long Term Forecast (&gt;50 Days)</p>
                    <p>Confidence Score</p>
                    <div className="flex justify-center items-center gap-x-4">
                      <Progress
                        value={parseFloat(
                          (
                            Number(
                              predictionData.longTerm.accuracy.correlation
                            ) * 100
                          ).toFixed(0)
                        )}
                      />
                      <p>
                        {(
                          Number(predictionData.longTerm.accuracy.correlation) *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("id-ID").format(
                        predictionData.longTerm.predictedPrice.toFixed(0)
                      )}
                    </p>
                  </div>
                ) : (
                  <p>Loading Long Term Prediction...</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto p-4 flex flex-col">
          <h1 className="text-2xl font-bold">Related News</h1>

          <div className="flex flex-col lg:flex-row gap-x-4 gap-y-4 mt-4 mb-12">
            {(news || []).map((item: any) => {
              return (
                <>
                  <Card className="lg:w-1/3" key={item.title}>
                    <Link to={item.url} target="_blank">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="mt-2">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="rounded-lg"
                        />
                      </CardContent>
                      <CardFooter className="mt-2 font-light">
                        Source : {item.source}
                      </CardFooter>
                    </Link>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
