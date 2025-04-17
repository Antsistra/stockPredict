import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

function NewsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
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
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        News List
      </h1>
      <div className="relative h-[300px] overflow-hidden">
        <div
          className="w-full overflow-y-auto scrollbar-hide hover:scrollbar-default pr-2"
          style={{ maxHeight: "300px" }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            news.map((item: any) => (
              <Link to={item.url} target="_blank" className="no-underline">
                <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                  <h1 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.source.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {new Date(item.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
