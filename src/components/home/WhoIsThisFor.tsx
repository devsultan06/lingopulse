import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WhoIsThisFor = () => {
  const { t } = useTranslation();
  const bgWords = [
    "English",
    "French",
    "Arabic",
    "Hausa",
    "Spanish",
    "Connect",
    "Translate",
    "Unite",
    "Speak",
    "Understand",
    "Demo",
  ];

  return (
    <section
      id="why-it-matters"
      className="relative mt-20 py-32 overflow-hidden bg-white "
    >
      {/* Diamond Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-0 opacity-100 pointer-events-none select-none overflow-hidden py-10">
        <div className="flex flex-col gap-12">
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className={`flex whitespace-nowrap gap-12 ${rowIdx % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              {Array.from({ length: 12 }).map((_, colIdx) => (
                <span
                  key={colIdx}
                  className="font-space-grotesk font-bold text-[72px] leading-[1.4] uppercase tracking-normal text-white"
                  style={{
                    WebkitTextStroke: "2px #cdd1d4",
                  }}
                >
                  {bgWords[(rowIdx + colIdx) % bgWords.length]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex justify-center">
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  className="bg-[#dcf7e7] border-2 border-black rounded-[40px] p-8 md:p-16 max-w-3xl relative shadow-[3px_3px_0px_0px_#000]"
>
  {/* Top-Left Decorative Star */}
  <div className="absolute -top-[30px] -left-[30px] hidden md:block">
    <img
      src="/images/purple_shine.svg"
      alt="Purple Shine"
      className="w-24 h-24"
    />
  </div>

  {/* Top-Right Badge */}
  <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-20 h-20 md:w-32 md:h-32 bg-tangelo-orange border-2 border-black rounded-full flex items-center justify-center rotate-[15deg] shadow-[2px_2px_0px_0px_#000] group overflow-hidden">
    <span className="text-white font-bold text-center text-xs md:text-base px-2 uppercase leading-tight font-space-grotesk">
      {t("whoIsThisFor.badge")}
    </span>
  </div>

  {/* Content */}
  <div className="text-center">
    <h2 className="text-3xl md:text-6xl font-black font-space-grotesk mb-8 tracking-tighter">
      {t("whoIsThisFor.title")}
    </h2>
    <div className="space-y-6">
      <p className="text-[18px] leading-[28.8px] font-medium tracking-tight text-[#1C303C] font-satoshi">
        {t("whoIsThisFor.description")}
      </p>
      <p className="text-lg md:text-xl font-bold italic text-tangelo-orange">
        {t("whoIsThisFor.footer")}
      </p>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
