import { motion } from "framer-motion";

const DashboardPreview = () => {
  return (
    <section
      className="relative pt-32 pb-48 bg-[#DAC3FF] min-h-[750px]"
      style={{
        backgroundImage: "url('/images/fold_grid.svg')",
        backgroundPosition: "50% 120%",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto",
      }}
    >
      {/* Decorative Shapes */}
      <div className="absolute left-[15%] top-[33%] hidden lg:block z-10">
        <img
          src="/images/yellow_diamond.svg"
          alt="Yellow Diamond"
          className="w-[113px] h-[113px] "
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title & Subtext */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black font-space-grotesk mb-8 tracking-tighter text-black"
          >
            The Internet, <br className="md:hidden" />
            <span className="text-blue-violet">Without Language Barriers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium text-[#1C303C]/80 max-w-3xl mx-auto leading-relaxed font-satoshi"
          >
            Join a global space where every message is instantly translated into
            your language. Speak freely. Understand everyone. Connect in real
            time.
          </motion.p>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-5xl mx-auto translate-y-[450px] -mb-[250px]"
        >
          {/* Main Mockup Container */}
          <div className="bg-white border-2 border-black rounded-[24px] overflow-hidden shadow-[6px_6px_0px_0px_#000] flex min-h-[500px] md:min-h-[600px] relative z-10">
            {/* Sidebar */}
            <div className="w-20 md:w-64 bg-[#6E48FF] border-r-4 border-black flex flex-col">
              <div className="p-4 md:p-6 border-bottom-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center font-black text-xs md:text-sm">
                    LP
                  </div>
                  <span className="hidden md:block text-white font-black font-space-grotesk text-lg tracking-tight">
                    lingopulse
                  </span>
                </div>
              </div>

              <div className="flex-1 p-2 md:p-4 space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <span className="hidden md:block text-white/50 uppercase text-[10px] font-black tracking-widest pl-2">
                    Channels
                  </span>
                  <div className="space-y-1">
                    {[
                      { name: "Global Chat", icon: "🌍", active: false },
                      { name: "French Room", icon: "🇫🇷", active: true },
                      { name: "Hausa Room", icon: "🇳🇬", active: false },
                      { name: "Spanish Room", icon: "🇪🇸", active: false },
                      { name: "Trending", icon: "🔥", active: false },
                    ].map((item, i) => (
                      <button
                        key={i}
                        className={`w-full flex items-center gap-3 p-2 md:p-3 rounded-xl transition-all border-2 ${item.active ? "bg-tangelo-orange border-black text-white shadow-[2px_2px_0px_0px_#000]" : "bg-transparent border-transparent text-white/80 hover:bg-white/10"}`}
                      >
                        <span className="text-xl md:text-lg">{item.icon}</span>
                        <span className="hidden md:block font-bold text-sm">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-4 md:p-6 border-b-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-black font-space-grotesk">
                    # French Room
                  </span>
                </div>
              </div>

              <div className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto">
                {/* Message 1 */}
                <div className="flex flex-col items-start max-w-[80%]">
                  <div className="bg-[#f0f0f0] border-2 border-black rounded-2xl rounded-tl-none p-4 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-sm md:text-base font-medium">
                      Hello everyone
                    </p>
                    <div className="mt-2 text-[10px] md:text-xs font-black uppercase text-black/40 flex items-center gap-2 border-t border-black/10 pt-2">
                      <span className="italic font-bold">
                        Bonjour tout le monde
                      </span>
                      <span className="bg-black/10 px-1.5 py-0.5 rounded uppercase leading-none">
                        Translated from French
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex flex-col items-start max-w-[80%]">
                  <div className="bg-[#E2F7ED] border-2 border-black rounded-2xl rounded-tl-none p-4 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-sm md:text-base font-medium">
                      Hi! How is the hackathon going?
                    </p>
                    <div className="mt-2 text-[10px] md:text-xs font-black uppercase text-black/40 flex items-center gap-2 border-t border-black/10 pt-2">
                      <span className="italic font-bold">
                        Sannu! Ya nassin taron hackathon din yake?
                      </span>
                      <span className="bg-black/10 px-1.5 py-0.5 rounded uppercase leading-none">
                        Translated from Hausa
                      </span>
                    </div>
                  </div>
                </div>

                {/* My Message */}
                <div className="flex flex-col items-end w-full">
                  <div className="bg-tangelo-orange border-2 border-black rounded-2xl rounded-tr-none p-4 shadow-[4px_4px_0px_0px_#000] max-w-[80%]">
                    <p className="text-sm md:text-base font-medium text-white">
                      It's going great! Everyone understands me perfectly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t-4 border-black">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message in any language..."
                    className="w-full bg-[#f0f0f0] border-2 border-black rounded-xl p-4 md:p-5 pr-12 font-medium focus:outline-none focus:ring-0 shadow-[2px_2px_0px_0px_#000]"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#6E48FF] border-2 border-black rounded-lg flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Element (Bottom Right Sparkle) - NOW UNDER */}
          <div className="absolute -bottom-16 -right-16 md:-bottom-24 md:-right-24 pointer-events-none z-0">
            <img
              src="/images/just_a_flu.svg"
              alt="Just a flu"
              className="w-30 h-30 md:w-[200px] md:h-[200px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
