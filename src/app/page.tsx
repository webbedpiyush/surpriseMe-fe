"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CanvasWords = [
  "meteormen.com",
  "thetravelingoutdoorsman.com",
  "treeservicekansascitypro.com",
  "peters-windsurfing.shop",
  "keepinitjesus.com",
  "vboutique.com",
  "farangabroad.com",
  "airmaxinflatables.com",
  "ultimateairdogs.com",
  "laryndesign.com",
  "asahq.org",
  "bioderma.co.rs",
  "lcmd.club",
  "tampafp.com",
  "blackhillsprospectingclub.com",
  "outinchiangmai.com",
  "myazdentist.com",
  "utahtokensociety.com",
  "weekendgoldminers.com",
  "bullgreen.co.uk",
  "detectorsunlimited.org",
  "towathens.com",
  "allemaillist.com",
  "gccexpat.com",
  "crawleybotox.co.uk",
  "ocddetailing.ie",
  "wbtha.com",
  "topuph.com",
  "rttreasure.com",
  "encona.com",
  "cgpgold.org",
  "mxperience.com",
  "uaeexpatriates.com",
  "nvrha.com",
  "cityofevanston.org",
  "listn.to",
  "lvhrra.com",
  "gpanm.org",
  "wavewalk.com",
  "hostkats.com",
  "carcleaningltd.co.uk",
  "balloondecorationpros.com",
  "mainegoldprospectors.club",
  "protechub.com",
  "chicklitcafe.com",
  "tamdc.org",
  "hools.wordpress.com",
  "tinysociety.co",
  "emaildatabaseusa.com",
  "dsmdc.org",
  "thefactualdoggo.com",
];

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSite, setSelectedSite] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch("./output.csv");
        const csvData = await response.text();

        const lines = csvData.split("\n");
        const urlArray = lines
          .map((line) => line.split(",")[1])
          .filter(Boolean);
        setWords(urlArray);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    setIsClient(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      text: string;
      opacity: number;
    }[] = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < 100; i++) {
        if (canvas) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 6,
            speed: Math.random() * 0.8 + 0.6,
            text: CanvasWords[Math.floor(Math.random() * CanvasWords.length)],
            opacity: Math.random() * 0.2 + 0.1,
          });
        }
      }
    }

    function animate() {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(10, 10, 10, 0.9)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          particles.forEach((p) => {
            ctx.font = `${p.size}px Arial`;

            const textWidth = ctx.measureText(p.text).width;
            const isHovered =
              mousePos.x > p.x &&
              mousePos.x < p.x + textWidth &&
              mousePos.y > p.y - p.size &&
              mousePos.y < p.y;

            if (isHovered) {
              ctx.fillStyle = "rgba(128, 0, 128, 0.8)";
            } else {
              ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
            }

            ctx.fillText(p.text, p.x, p.y);

            p.y -= p.speed;
            if (p.y < 0 - p.size) {
              p.y = canvas.height + p.size;
              p.x = Math.random() * canvas.width;
              p.opacity = Math.random() * 0.2 + 0.1;
            }
          });

          requestAnimationFrame(animate);
        }
      }
    }

    handleResize();
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleVisitRandom = () => {
    setIsSearching(true);
    setShowModal(false);
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    let elapsed = 0;

    const updateSearch = () => {
      if (elapsed < duration) {
        const randomIndex = Math.floor(Math.random() * words.length);
        setSelectedSite(words[randomIndex]);
        elapsed += interval;
        setTimeout(updateSearch, interval);
      } else {
        setIsSearching(false);
      }
    };

    updateSearch();
  };

  useEffect(() => {
    if (isSearching && searchRef.current) {
      searchRef.current.scrollTop = searchRef.current.scrollHeight;
    }
  }, [selectedSite, isSearching]);

  const handleVisitSite = () => {
    if (dontShowAgain) {
      window.open(`${selectedSite}`, "_blank");
    } else {
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    window.open(`${selectedSite}`, "_blank");
    setShowModal(false);
    setSelectedSite("");
  };

  if (!isClient) {
    return null;
  }

  const showName = (url: any) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace(/^www\./, "");
  };

  return (
    <div className="relative min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-xl md:text-2xl font-bold">
              RandomSite
            </a>
            <a
              href="https://github.com/webbedpiyush"
              target="_blank"
              className="text-gray-300 hover:text-white transition-colors text-sm md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </nav>
        </header>
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center w-full max-w-md">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              To the Moon & back
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Visit a random website and discover something new
            </p>
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="searching"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  ref={searchRef}
                  className="bg-gray-800 p-4 rounded-lg mb-4 h-32 sm:h-40 overflow-y-auto"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-purple-500 animate-spin mr-2"></div>
                    <span className="text-white">Searching links...</span>
                  </div>
                  {selectedSite && (
                    <div className="text-gray-300">{selectedSite}</div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* <button
                    onClick={handleVisitRandom}
                    className="bg-white text-gray-800 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-full sm:w-auto"
                  >
                    Visit a random website
                  </button> */}
                  {selectedSite ? (
                    <button
                      onClick={handleVisitSite}
                      className="bg-purple-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg text-lg md:text-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Visit {showName(selectedSite)}
                    </button>
                  ) : (
                    <button
                      onClick={handleVisitRandom}
                      className="bg-white text-gray-800 font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg text-lg md:text-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    >
                      Visit a random website
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-4 sm:p-6 rounded-lg max-w-md w-full"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Warning
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              We have made our best effort to filter out any adult or illegal
              content; however, we aren't able to review every page we index.
            </p>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              Continue at your discretion
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="mr-2"
              />
              <label
                htmlFor="dontShowAgain"
                className="text-sm sm:text-base text-gray-300"
              >
                {"Don't show this again"}
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedSite("");
                }}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded text-sm sm:text-base hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 text-white rounded text-sm sm:text-base hover:bg-purple-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
