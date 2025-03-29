import React from "react";
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
const BMRI = {
  language: "en-US",
  region: "US",
  quoteType: "EQUITY",
  typeDisp: "Equity",
  quoteSourceName: "Delayed Quote",
  triggerable: false,
  customPriceAlertConfidence: "LOW",
  currency: "IDR",
  regularMarketChangePercent: 0.9708738,
  regularMarketPrice: 5200,
  marketState: "CLOSED",
  shortName: "Bank Mandiri (Persero) Tbk",
  longName: "PT Bank Mandiri (Persero) Tbk",
  corporateActions: [],
  regularMarketTime: "2025-03-27T09:14:44.000Z",
  exchange: "JKT",
  messageBoardId: "finmb_8387507",
  exchangeTimezoneName: "Asia/Jakarta",
  exchangeTimezoneShortName: "WIB",
  gmtOffSetMilliseconds: 25200000,
  market: "id_market",
  esgPopulated: false,
  earningsTimestamp: "2025-01-22T10:59:00.000Z",
  earningsTimestampStart: "2025-04-28T10:59:00.000Z",
  earningsTimestampEnd: "2025-05-02T12:00:00.000Z",
  earningsCallTimestampStart: 1737507600,
  earningsCallTimestampEnd: 1737507600,
  isEarningsDateEstimate: true,
  trailingAnnualDividendRate: 0,
  trailingPE: 8.70322,
  dividendRate: 353.96,
  trailingAnnualDividendYield: 0,
  dividendYield: 7.56,
  epsTrailingTwelveMonths: 597.48,
  epsForward: 663.48,
  epsCurrentYear: 618.5187,
  priceEpsCurrentYear: 8.407184,
  sharesOutstanding: 93333299200,
  bookValue: 3040.676,
  fiftyDayAverage: 5200.7,
  fiftyDayAverageChange: -0.7001953,
  fiftyDayAverageChangePercent: -0.00013463481,
  twoHundredDayAverage: 6217.675,
  twoHundredDayAverageChange: -1017.6748,
  twoHundredDayAverageChangePercent: -0.1636745,
  marketCap: 485333149941760,
  forwardPE: 7.8374634,
  priceToBook: 1.7101461,
  sourceInterval: 10,
  exchangeDataDelayedBy: 10,
  averageAnalystRating: "1.6 - Buy",
  tradeable: false,
  cryptoTradeable: false,
  hasPrePostMarketData: false,
  firstTradeDateMilliseconds: "2003-07-14T02:00:00.000Z",
  priceHint: 2,
  regularMarketChange: 50,
  regularMarketDayHigh: 5250,
  regularMarketDayRange: {
    low: 5050,
    high: 5250,
  },
  regularMarketDayLow: 5050,
  regularMarketVolume: 301025300,
  regularMarketPreviousClose: 5150,
  bid: 5200,
  ask: 5225,
  bidSize: 0,
  askSize: 0,
  fullExchangeName: "Jakarta",
  financialCurrency: "IDR",
  regularMarketOpen: 5150,
  averageDailyVolume3Month: 196586437,
  averageDailyVolume10Day: 297852980,
  fiftyTwoWeekLowChange: 950,
  fiftyTwoWeekLowChangePercent: 0.22352941,
  fiftyTwoWeekRange: {
    low: 4250,
    high: 7550,
  },
  fiftyTwoWeekHighChange: -2350,
  fiftyTwoWeekHighChangePercent: -0.3112583,
  fiftyTwoWeekLow: 4250,
  fiftyTwoWeekHigh: 7550,
  fiftyTwoWeekChangePercent: -28.27586,
  symbol: "BMRI.JK",
};

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
import { useParams } from "react-router-dom";
export default function StockPage() {
  const { symbol } = useParams<{ symbol: string }>();
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
              <div className="flex p-8 lg:p-12 w-full  border-2  bg-white shadow-md lg:h-40 mt-4  justify-between rounded-3xl">
                <div className="flex flex-col items-center lg:text-lg">
                  <p>Market Cap</p>
                  <p className="font-bold">{formatMarketCap(BMRI.marketCap)}</p>
                </div>
                <div className="flex flex-col items-center lg:text-lg">
                  <p>52W High</p>
                  <p className="font-bold">{BMRI.fiftyTwoWeekHigh}</p>
                </div>
                <div className="flex flex-col items-center lg:text-lg">
                  <p>52W Low</p>
                  <p className="font-bold">{BMRI.fiftyTwoWeekLow}</p>
                </div>
                <div className="flex flex-col items-center lg:text-lg">
                  <p>PBV</p>
                  <p className="font-bold">{BMRI.priceToBook.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/6 lg:h-[79vh]  max-w-screen-xl mt-8 lg:mt-0 rounded-3xl flex flex-col">
              <h1 className="font-bold text-2xl mb-4 ">AI Prediction</h1>
              <div className="flex flex-col gap-y-4">
                <div className=" w-full bg-white border-2 p-4 rounded-lg ">
                  <p>Short Term Forecast (7Days)</p>
                  <p>Confidence Score</p>
                  <div className="flex justify-center items-center gap-x-4">
                    <Progress value={50} />
                    <p>50%</p>
                  </div>
                  <p className="text-2xl font-bold">4.834</p>
                </div>
                <div className=" w-full bg-white border-2 p-4 rounded-lg ">
                  <p>Short Term Forecast (7Days)</p>
                  <p>Confidence Score</p>
                  <div className="flex justify-center items-center gap-x-4">
                    <Progress value={50} />
                    <p>50%</p>
                  </div>
                  <p className="text-2xl font-bold">4.834</p>
                </div>
                <div className=" w-full bg-white border-2 p-4 rounded-lg ">
                  <p>Short Term Forecast (7Days)</p>
                  <p>Confidence Score</p>
                  <div className="flex justify-center items-center gap-x-4">
                    <Progress value={50} />
                    <p>50%</p>
                  </div>
                  <p className="text-2xl font-bold">4.834</p>
                </div>
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
