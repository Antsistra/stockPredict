import TradingviewWidget from "@/components/fragments/TradingviewWidget";
import Navbar from "@/components/layouts/navbar";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import stockList from "@/constant/stockList.json";
export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: watchlist, isLoading, isError } = useWatchlist();
  const [filteredStocks, setFilteredStocks] = useState(stockList.stocks);

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
  return (
    <>
      <div className="min-h-screen select-none">
        <Navbar />
        <div className="max-w-screen-xl mx-auto p-4 ">
          <Input
            type="text"
            placeholder="Search Stocks"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Display Search Results */}
          {searchTerm && (
            <div className="mt-4 p-2 bg-white rounded-lg shadow-md absolute w-full">
              {filteredStocks.length > 0 ? (
                filteredStocks.slice(0, 5).map((stock: any) => (
                  <>
                    {" "}
                    <Link to={`/stock/${stock.symbol}`}>
                      <div className="p-2 mb-2 gap-y-2 flex flex-col ">
                        <p className="font-bold text-xl">{stock.symbol}</p>
                        <p className="text-sm">{stock.name}</p>
                      </div>
                    </Link>
                  </>
                ))
              ) : (
                <p className="text-center text-lg">No stocks found</p>
              )}
            </div>
          )}
        </div>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="w-full h-[55vh] flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold ">Index Harga Saham Gabungan</h1>
            <TradingviewWidget symbol="COMPOSITE" />
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="text-2xl font-bold">Watchlist</h1>
            <AlertDialog>
              <AlertDialogTrigger></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Handle Loading & Error State */}
          {isLoading && (
            <p className="text-center text-lg">Loading watchlist...</p>
          )}
          {isError && (
            <p className="text-center text-red-500">Error loading data</p>
          )}
          {!isLoading && !isError && watchlist && watchlist.length > 0 && (
            <div className="flex lg:flex-row flex-col gap-y-4 pb-8 gap-x-4 mt-4">
              {watchlist.slice(0, 4).map((stock: any) => (
                <Card className="lg:w-1/4" key={stock.symbol}>
                  <Link to={`/stock/${stock.symbol}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">
                        {stock.symbol}
                      </CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-3xl font-bold">{`${stock.price}`}</p>
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
            <p className="text-center text-lg mt-4">
              No stocks in your watchlist.
            </p>
          )}
        </div>
      </div>
      <footer className="w-full bg-[#2563EB] p-2 flex justify-center items-center text-white font-medium">
        2025 Stock Predict - All rights reserved
      </footer>
    </>
  );
}
