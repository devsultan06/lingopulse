import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CTAProps {
  onJoinClick: () => void;
}

const CTA = ({ onJoinClick }: CTAProps) => {
  const { t } = useTranslation();

  return (
    <section
      id="cta"
      className="relative w-full h-[500px] md:h-[500px] flex items-center justify-center bg-[#6E61FF]"
      style={{
        backgroundImage: "url('/images/cta_fold_grid.svg')",
        backgroundPosition: "50% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "visible",
      }}
    >
      {/* Decorative Shapes omitted for brevity as they don't contain text */}
      <div className="absolute top-[-5%] left-[8%] block">
        <img
          src="/images/blue_diamond.svg"
          alt=""
          className="w-10 h-10 md:w-[72px] md:h-[73px]"
        />
      </div>

      <div className="absolute top-[40%] left-[10%] hidden lg:block">
        <img src="/images/red_star.svg" alt="" className="w-16 h-16 " />
      </div>

      <div className="absolute bottom-[-10%] z-30 left-[2%] block">
        <img
          src="/images/yellow_diamond_cta.svg"
          alt=""
          className="w-16 h-16 md:w-[110px] md:h-[114px]"
        />
      </div>

      <div className="absolute top-[-20px] right-[-20px] translate-x-1/4 -translate-y-1/4 block z-20">
        <img
          src="/images/teal_shine.svg"
          alt=""
          className="w-24 h-24 md:w-48 md:h-48"
        />
      </div>

      <div className="absolute top-[50%] right-[10%] hidden lg:block">
        <img
          src="/images/purple_star_cta.svg"
          alt=""
          className="w-[74px] h-[75px]"
        />
      </div>

      <div className="absolute bottom-[14%] right-[33%] block">
        <img
          src="/images/flower_cta.svg"
          alt=""
          className="w-10 h-10 md:w-[62px] md:h-[62px]"
        />
      </div>

      {/* Text Content */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="relative z-10 text-center px-4"
>
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-space-grotesk text-white mb-6 tracking-tight leading-tight">
    {t("cta.title1")} <br />
    {t("cta.title2")}
    <span className="">{t("cta.titleHighlight")}</span> {t("cta.title3")}
  </h2>
  <p className="text-xl md:text-2xl font-bold font-space-grotesk text-white mb-10">
    {t("cta.subtitle")}
  </p>

  <button
    onClick={onJoinClick}
    className="relative inline-flex items-center justify-center "
  >
    <div className="absolute inset-0 bg-black rounded-full translate-x-1.5 translate-y-1.5" />
    <div className="relative bg-white border-2 border-black text-black font-black text-xl rounded-full px-10 py-5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 font-space-grotesk tracking-tight">
      {t("cta.button")} <span className="ml-2">›</span>
    </div>
  </button>
</motion.div>
    </section>
  );
};

export default CTA;
