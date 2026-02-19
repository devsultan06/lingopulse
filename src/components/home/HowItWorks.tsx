import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Zap, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StepItem {
  title: string;
  text: string;
}

const HowItWorks = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const steps = t("howItWorks.steps", { returnObjects: true }) as StepItem[];
  const stepColors = ["#dcf7e7", "#DAC3FF", "#FFA352"];

  const stepVisuals = [
    (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#000] w-[80%]">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold">Language</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 bg-blue-50 p-1.5 rounded border border-blue-200">
              <span className="text-xs font-bold">🇺🇸 English (US)</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 opacity-40">
              <span className="text-xs font-bold">🇫🇷 French</span>
            </div>
          </div>
        </div>
        <div className="absolute top-[60%] right-[15%] w-6 h-6 bg-white border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rotate-[15deg]">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black -rotate-45"></div>
        </div>
      </div>
    ),
    (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#000] w-[85%] rotate-[-2deg]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-tangelo-orange border border-black flex items-center justify-center text-[8px] text-white font-bold">
              JS
            </div>
            <div className="h-2 w-16 bg-gray-100 rounded"></div>
          </div>
          <div className="bg-gray-50 border-2 border-black rounded-lg p-2 mb-2 text-[10px] font-medium italic">
            "Sannu, yaya kake?"
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white border-2 border-black rounded-lg px-2 py-1 text-[10px] font-bold shadow-[2px_2px_0px_0px_#000]">
              "Hi, how are you?"
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 border-2 border-black rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase rotate-12">
            Auto-Translated
          </div>
        </div>
      </div>
    ),
    (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full border-2 border-black animate-ping opacity-20"></div>
        </div>
        <div className="bg-white border-2 border-black rounded-full w-20 h-20 flex items-center justify-center shadow-[4px_4px_0px_0px_#000] relative z-10">
          <Zap className="w-10 h-10 text-yellow-500 fill-yellow-500 stroke-black stroke-[1.5px] animate-pulse" />
        </div>
        <div className="absolute top-4 right-8 bg-green-400 border-2 border-black rounded-lg p-1 px-2 text-[10px] font-black text-white shadow-[2px_2px_0px_0px_#000] rotate-12">
          LIVE
        </div>
        <div className="absolute w-2 h-2 bg-blue-400 border border-black rounded-full top-[20%] left-[20%] animate-bounce"></div>
        <div className="absolute w-2 h-2 bg-purple-400 border border-black rounded-full bottom-[20%] right-[30%] animate-bounce delay-100"></div>
      </div>
    ),
  ];

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="pt-[250px] pb-32 bg-white relative "
    >
      {/* Decorative Blue Wheel (Bottom Left) - ROTATES ON SCROLL */}
      <div className="absolute bottom-[-30px] left-[-30px] md:bottom-[-60px] md:left-[-60px] z-30 block">
        <motion.img
          style={{ rotate }}
          src="/images/blue_wheel.svg"
          alt="decoration"
          className="w-32 h-32 md:w-64 md:h-64"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black font-space-grotesk text-center mb-24 tracking-tighter">
          {t("howItWorks.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Visual Container */}
              <div
                className="w-full aspect-[4/3] rounded-[32px] border-4 border-black mb-10 shadow-[8px_8px_0px_0px_#000] p-6 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[4px_4px_0px_0px_#000]"
                style={{ backgroundColor: stepColors[index] }}
              >
                {stepVisuals[index]}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl md:text-3xl font-black font-space-grotesk mb-6 tracking-tight leading-none group-hover:text-tangelo-orange transition-colors">
                {step.title}
              </h3>
              <p className="text-lg font-medium text-[#1C303C]/70 leading-relaxed font-satoshi max-w-sm">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
