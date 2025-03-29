import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWatchlist = async () => {
  const response = await axios.post("http://localhost:3000/api/watchlist", {
    watchlist: [
      { symbol: "BMRI" },
      { symbol: "ADRO" },
      { symbol: "BBCA" },
      { symbol: "BBCA" },
      { symbol: "BBCA" },
      { symbol: "BBCA" },
    ],
  });
  return response.data.data; // Sesuai dengan format response dari backend
};

export const useWatchlist = () => {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
    staleTime: 1000 * 60, // Cache selama 1 menit
  });
};
