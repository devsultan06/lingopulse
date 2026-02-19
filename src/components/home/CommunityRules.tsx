import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface RuleItem {
  title: string;
  text: string;
}

const CommunityRules = () => {
  const { t } = useTranslation();
  const rules = t("communityRules.rules", { returnObjects: true }) as RuleItem[];
  const cardColors = ["#DAC3FF", "#E2F7ED", "#FFA352"];

  return (
    <section className="py-32 bg-[#F0F4F2] relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Side Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-48 self-start pt-4">
            <h2 className="text-4xl md:text-5xl font-black font-space-grotesk mb-8 tracking-tighter">
              {t("communityRules.title")}
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#1C303C]/80 mb-12 leading-relaxed font-satoshi max-w-lg">
              {t("communityRules.subtitle")}
            </p>

            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] max-w-md">
              <h4 className="text-lg font-black font-space-grotesk mb-2 uppercase tracking-tight">
                {t("communityRules.note")}
              </h4>
              <p className="text-base font-medium text-[#1C303C]/70 font-satoshi">
                {t("communityRules.noteText")}
              </p>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:w-1/2 flex flex-col gap-10 w-full">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group ${index === 2 ? "lg:ml-8" : ""}`}
              >
                <div
                  className="border-2 border-black rounded-[24px] p-8 shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all"
                  style={{ backgroundColor: cardColors[index] }}
                >
                  <h3 className="text-2xl font-black font-space-grotesk mb-3 tracking-tight">
                    {rule.title}
                  </h3>
                  <p className="text-lg font-medium text-[#1C303C]/70 font-satoshi leading-relaxed">
                    {rule.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityRules;
