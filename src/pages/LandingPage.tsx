import { ChartCandlestick, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdTimeline } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

// FAQ Component
const faqs = [
  {
    question: "How accurate are the AI predictions?",
    answer:
      "Our AI model has been trained on extensive market data and has shown an accuracy rate of over 85% in predicting market trends.",
  },
  {
    question: "What data sources do you use?",
    answer:
      "We aggregate data from multiple reliable sources including market feeds, news APIs, and financial reports to ensure comprehensive analysis.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to protect your data and trading information.",
  },
  {
    question: "Can I try before subscribing?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features.",
  },
];

// Animated Chart Component
function AnimatedChart() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Grid Lines */}
        <g stroke="#E5E7EB" strokeWidth="1" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h-${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="300" />
          ))}
        </g>

        {/* Animated Line */}
        <motion.path
          d="M0,150 C50,100 100,200 150,150 C200,100 250,200 300,150 C350,100 400,200 400,150"
          stroke="#4F46E5"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Data Points */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={i * 100}
            cy={i % 2 === 0 ? 150 : 100}
            r="4"
            fill="#4F46E5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 select-none">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white"
            >
              <ChartCandlestick className="size-5" />
            </motion.div>
            <span className="font-semibold text-gray-900 dark:text-white">
              StockPredict
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                  Login
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Smart Investing with{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                AI-Powered
              </span>{" "}
              Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Make data-driven investment decisions with our advanced AI
              technology. Get real-time market analysis and predictive insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-lg cursor-pointer">
                    Get Started <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                variant="outline"
                className="h-12 px-8 text-lg dark:border-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-[500px] relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl" />
            <AnimatedChart />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to make informed investment decisions
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Predictions",
                description:
                  "Advanced machine learning algorithms analyze market patterns and predict future trends.",
                icon: (
                  <GiArtificialHive className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
              {
                title: "Real-time Market Data",
                description:
                  "Access up-to-the-minute market data and analysis from multiple sources.",
                icon: (
                  <MdTimeline className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
              {
                title: "Risk Analysis",
                description:
                  "Comprehensive risk assessment tools to help you make safer investment decisions.",
                icon: (
                  <MdOutlineHealthAndSafety className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
              {
                title: "Market News",
                description:
                  "Stay informed with curated financial news and market updates.",
                icon: (
                  <IoNewspaperOutline className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
              {
                title: "Portfolio Tracking",
                description:
                  "Monitor your investments and track performance in real-time.",
                icon: (
                  <ChartCandlestick className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
              {
                title: "Custom Alerts",
                description:
                  "Set up personalized alerts for market movements and opportunities.",
                icon: (
                  <MdOutlineHealthAndSafety className="size-8 text-indigo-600 dark:text-indigo-400" />
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find answers to common questions about our platform
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Start Investing Smarter?
            </h2>
            <p className="text-xl text-indigo-100">
              Join thousands of investors who trust our AI-powered platform
            </p>
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 h-12 px-8 text-lg cursor-pointer">
                  Get Started Now <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
                  <ChartCandlestick className="size-5" />
                </div>
                <span className="font-semibold text-white">StockPredict</span>
              </div>
              <p className="text-sm">
                Empowering investors with AI-driven insights for smarter trading
                decisions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2024 StockPredict. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
