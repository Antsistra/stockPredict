import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getWatchList = async() => {
  
  const userId = await supabase.auth.getUser();
  if (!userId.data.user) {
    throw new Error("User is not authenticated");
  }
  const {data ,error } = await supabase.from("watchlist").select("*").eq("userId", userId.data.user.id);
  if(error) {
    throw new Error(error.message);
  }
  console.log("Data watchlist", data);
    return data;

}

const fetchWatchlist = async () => {
  const watchlist = await getWatchList();
  const response = await axios.post("http://localhost:3000/api/watchlist", {
    watchlist: watchlist.map((stocks) => {
      return {
        symbol: stocks.stock_symbol,
      }; 
    }),
  });
  console.log("Response watchlist", response.data.data);
  return response.data.data; 
};

export const useWatchlist = () => {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
    staleTime: 1000 * 60, // Cache selama 1 menit
  });
};
