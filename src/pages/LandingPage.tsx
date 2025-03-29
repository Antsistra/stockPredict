import { ChartCandlestick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdTimeline } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
export default function LandingPage() {
  return (
    <>
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-black text-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <ChartCandlestick className="size-5" />
          </div>
          StockPredict
        </a>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </nav>
      <section id="jumbotron" className="bg-neutral-background">
        <div className="flex  max-w-screen-xl items-center mx-auto p-4  gap-x-12 ">
          <div className="w-1/2 items-center justify-center   p-12  h-screen mr-4">
            <img
              src="https://picsum.photos/200/300"
              className="w-full h-5/6  object-cover rounded-4xl drop-shadow-lg"
              alt=""
            />
          </div>
          <div className="w-1/2 h-screen p-12 flex flex-col gap-y-4 justify-center">
            <h1 className="text-6xl font-semibold">
              Navigate the Market, Maximize Your Investments
            </h1>
            <h5 className=" font-light">
              Gain AI-driven insights to make smarter investment decisions and
              stay ahead in the stock market.
            </h5>
            <div className="flex gap-x-4">
              <Button>Get Started</Button>
              <Button>Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section id="subsection">
        <div className="flex flex-col max-w-screen-xl items-center mx-auto p-4 gap-x-12 pt-28  pb-28">
          <h1 className="text-5xl font-semibold w-full">
            Transforming Data into Actionable Insights
          </h1>
          <div className="flex w-full gap-x-4 mt-4">
            <div className="flex w-1/2 p-2 flex-col gap-y-4">
              <h1 className="text-xl font-semibold">
                AI-Powered Stock Predictions
              </h1>
              <h1 className="font-light">
                In the world of investing, value lies in data-driven insights
                that empower traders and investors. It's about providing
                accurate market analysis, identifying opportunities, and
                mitigating risks to help users make informed decisions. Our
                platform goes beyond expectations, offering AI-powered stock
                predictions that transform complex data into actionable
                strategies for financial growth.
              </h1>
            </div>
            <div className="flex flex-col w-1/2  p-8 px-24 gap-y-4">
              <div className="flex gap-x-4">
                <div className="flex justify-center items-center  gap-x-2 w-1/2  p-4 rounded-xl border-2">
                  {" "}
                  <GiArtificialHive className="size-8" />
                  <h1>AI-Driven Forecasts</h1>{" "}
                </div>
                <div className="flex gap-x-2 justify-center items-center w-1/2 p-4 rounded-xl border-2">
                  {" "}
                  <MdOutlineHealthAndSafety className="size-8" />
                  <h1>Risk Analysis</h1>{" "}
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex gap-x-2 items-center justify-center w-1/2 p-4 rounded-xl border-2">
                  {" "}
                  <MdTimeline className="size-8" />
                  <h1>Realtime Market Data</h1>
                </div>
                <div className="flex gap-x-2 justify-center items-center w-1/2 p-4 rounded-xl border-2">
                  <IoNewspaperOutline className="size-8" />
                  Market News
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footer " className="bg-neutral-background">
        <footer className="max-w-screen-xl flex mx-auto p-4 py-12">
          <div className="flex flex-col">
            <div className="flex w-1/2 items-center gap-2 font-bold text-black text-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                <ChartCandlestick className="size-8" />
              </div>
              StockPredict
            </div>
            <div className="flex w-full gap-x-4 ">
              <div className="w-1/2 mt-4">
                <p className="font-light">
                  Empowering investors with AI-driven insights for smarter
                  trading decisions. Stay ahead of the market with real-time
                  data, predictive analytics, and expert strategies.
                </p>
                <p className="mt-4">
                  Copyright @ 2025 StockPredict, All rights reserved.
                </p>
              </div>
              <div className="w-1/2 mt-2  justify-end flex"></div>
            </div>
          </div>
          <div className="w-1/2 gap-y-2 flex flex-col justify-center">
            <p>Let me know if you'd like any tweaks! 🚀</p>
            <Link to="https://github.com/Antsistra">
              <FaGithub size={50} />
            </Link>
          </div>
        </footer>
      </section>
    </>
  );
}
