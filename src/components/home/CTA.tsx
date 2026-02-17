import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section
      className="relative w-full h-[400px] md:h-[400px] flex items-center justify-center bg-[#6E61FF]"
      style={{
        backgroundImage: "url('/images/cta_fold_grid.svg')",
        backgroundPosition: "50% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        overflow: "visible",
      }}
    >
      {/* Decorative Shapes - Exact Placements from Reference */}

      {/* Top Left - Blue Diamond */}
      <div className="absolute top-[-5%] left-[8%] block">
        <img
          src="/images/blue_diamond.svg"
          alt=""
          className="w-10 h-10 md:w-[72px] md:h-[73px]"
        />
      </div>

      {/* Mid Left - Red Star */}
      <div className="absolute top-[40%] left-[10%] hidden lg:block">
        <img src="/images/red_star.svg" alt="" className="w-16 h-16 " />
      </div>

      {/* Bottom Left - Yellow Diamond */}
      <div className="absolute bottom-[-10%] z-30 left-[2%] block">
        <img
          src="/images/yellow_diamond_cta.svg"
          alt=""
          className="w-16 h-16 md:w-[110px] md:h-[114px]"
        />
      </div>

      {/* Top Right - Green Blob (Teal Shine) */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 block z-20">
        <img
          src="/images/teal_shine.svg"
          alt=""
          className="w-24 h-24 md:w-48 md:h-48"
        />
      </div>

      {/* Mid Right - Purple Star */}
      <div className="absolute top-[50%] right-[10%] hidden lg:block">
        <img
          src="/images/purple_star_cta.svg"
          alt=""
          className="w-[74px] h-[75px]"
        />
      </div>

      {/* Bottom Center-ish - Flower */}
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
          Ready to stay ahead of <br />
          the <span className="">language</span> game?
        </h2>
        <p className="text-xl md:text-2xl font-bold font-space-grotesk text-white">
          Join our growing community today!
        </p>
      </motion.div>
    </section>
  );
};

export default CTA;
