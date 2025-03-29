import TradingviewWidget from "@/components/fragments/TradingviewWidget";
import Navbar from "@/components/layouts/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchList";

export default function DashboardPage() {
  const { data: watchlist, isLoading, isError } = useWatchlist();

  return (
    <>
      <div className="min-h-screen select-none">
        <Navbar />
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="w-full h-[55vh] flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold mt-4">
              Index Harga Saham Gabungan
            </h1>
            <TradingviewWidget symbol="COMPOSITE" />
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="text-2xl font-bold">Watchlist</h1>
            <Button>Add Watchlist</Button>
          </div>

          {/* Handle Loading & Error State */}
          {isLoading ? (
            <p className="text-center text-lg">Loading watchlist...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Error loading data</p>
          ) : (
            <div className="flex lg:flex-row flex-col gap-y-4 pb-8 gap-x-4 mt-4">
              {watchlist?.slice(0, 4).map((stock: any) => (
                <Card className="lg:w-1/4" key={stock.symbol}>
                  <Link to={`/stock/${stock.symbol}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">
                        {stock.symbol}
                      </CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-3xl font-bold">{`$${stock.price}`}</p>
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
        </div>
      </div>
      <footer className="w-full bg-[#2563EB] p-2 flex justify-center items-center text-white font-medium">
        2025 Stock Predict - All rights reserved
      </footer>
    </>
  );
}
