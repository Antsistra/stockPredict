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

const News = [
  {
    symbol: "BMRI.JK",
    news: [
      {
        title: "3 Dirjen Sri Mulyani Masuk Jajaran Komisaris Bank BUMN",
        source: "cnbcindonesia.com",
        published_at: "2025-03-27T07:00:30.000000Z",
        url: "https://www.cnbcindonesia.com/news/20250327130729-4-622262/3-dirjen-sri-mulyani-masuk-jajaran-komisaris-bank-bumn",
        image_url:
          "https://awsimages.detik.net.id/visual/2024/01/10/suasana-gedung-kementerian-keuangan-kemenkeu-di-jakarta-rabu-1012024-18_169.jpeg?w=650",
      },
      {
        title:
          "Dukung Swasembada Pangan 2026, Stakeholder Kupas Tuntas Upayanya!",
        source: "cnbcindonesia.com",
        published_at: "2025-03-18T10:32:33.000000Z",
        url: "https://www.cnbcindonesia.com/news/20250318172724-4-619717/dukung-swasembada-pangan-2026-stakeholder-kupas-tuntas-upayanya",
        image_url:
          "https://awsimages.detik.net.id/visual/2025/03/18/food-summit-2025-1742293938643_169.png?w=650",
      },
      {
        title:
          "Kejar Target 8%, Menteri Prabowo Kompak Beberkan Potensi Ekonomi RI",
        source: "cnbcindonesia.com",
        published_at: "2025-02-27T23:45:06.000000Z",
        url: "https://www.cnbcindonesia.com/news/20250227213506-4-614307/kejar-target-8-menteri-prabowo-kompak-beberkan-potensi-ekonomi-ri",
        image_url:
          "https://awsimages.detik.net.id/visual/2025/02/26/suasana-acara-cnbc-indonesia-economic-outlook-2025-di-hotel-westin-jakarta-rabu-2622025-1740539792110_169.jpeg?w=650",
      },
    ],
  },
];

function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)} T`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)} M`;
  }
  return value.toString();
}

export default function StockPage() {
  const [stockData, setStockData] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<boolean | null>(null);
  const { symbol } = useParams<{ symbol: string }>();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/stock/news/${symbol}.JK`);
      console.log("News data:", response.data);
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
      <div className=" min-h-screen select-none">
        <Navbar />
        <div className=" max-w-screen-xl mx-auto p-4 flex mt-4 bg-neutral">
          <div className="w-full  flex flex-col lg:flex-row gap-x-4">
            <div className="lg:w-4/6 ">
              <div className=" h-[53vh] mb-16">
                <h1 className="text-2xl font-bold mb-4">
                  {symbol} Stock Price
                </h1>
                <TradingviewWidget symbol={symbol || "Composite"} />
              </div>
              <div className="flex p-8 lg:p-12 w-full border-2 bg-white shadow-md lg:h-40 mt-4 justify-between rounded-3xl">
                {stockData ? (
                  <>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p>Market Cap</p>
                      <p className="font-bold">
                        {formatMarketCap(stockData.marketCap)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p>52W High</p>
                      <p className="font-bold">{stockData.fiftyTwoWeekHigh}</p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p>52W Low</p>
                      <p className="font-bold">{stockData.fiftyTwoWeekLow}</p>
                    </div>
                    <div className="flex flex-col items-center lg:text-lg">
                      <p>PBV</p>
                      <p className="font-bold">
                        {stockData.priceToBook?.toFixed(2)}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-lg">Loading stock data...</p>
                )}
              </div>
            </div>
            <div className="lg:w-2/6 lg:h-[79vh]  max-w-screen-xl mt-8 lg:mt-0 rounded-3xl flex flex-col">
              {stocks === null ? (
                <p className="mt-12 mb-4 text-center">Loading...</p>
              ) : stocks ? (
                <Button
                  className="h-12 bg-red-700 lg:mt-12 mb-4  cursor-pointer"
                  onClick={handleRemoveFromWatchlist}
                  disabled={loading}
                >
                  - Remove from Watchlist
                </Button>
              ) : (
                <Button
                  className="h-12 bg-teal-700 lg:mt-12 mb-4 cursor-pointer"
                  onClick={handleAddToWatchlist}
                  disabled={loading}
                >
                  + Add to Watchlist
                </Button>
              )}

              <h1 className="font-bold text-2xl mb-4 ">AI Prediction</h1>
              <div className="flex flex-col gap-y-4">
                {predictionData && predictionData.shortTerm ? (
                  <div className="w-full bg-white border-2 p-4 rounded-lg">
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
                  <div className="w-full bg-white border-2 p-4 rounded-lg">
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
                  <div className="w-full bg-white border-2 p-4 rounded-lg">
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
          {News.map((item) => {
            {
              return (
                <div className="flex  flex-col lg:flex-row gap-x-4 gap-y-4 mt-4 mb-12">
                  {item.news.map((news) => (
                    <Card className="lg:w-1/3" key={news.title}>
                      <Link to={news.url} target="_blank">
                        <CardHeader>
                          <CardTitle className="text-lg font-bold">
                            {news.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="mt-2">
                          <img
                            src={news.image_url}
                            alt={news.title}
                            className="rounded-lg"
                          />
                        </CardContent>
                        <CardFooter className="mt-2 font-light">
                          Source : {news.source}
                        </CardFooter>
                      </Link>
                    </Card>
                  ))}
                </div>
              );
            }
          })}
        </div>
      </div>
      <footer className="w-full bg-[#2563EB] p-2 items-center justify-center flex text-white font-medium">
        2025 Stock Predict - All rights reserved
      </footer>
    </>
  );
}
