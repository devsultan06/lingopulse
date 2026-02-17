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
      <div className="absolute top-[-5%] left-[8%] hidden md:block">
        <img
          src="/images/blue_diamond.svg"
          alt=""
          className="w-[72px] h-[73px]"
        />
      </div>

      {/* Mid Left - Red Star */}
      <div className="absolute top-[40%] left-[10%] hidden lg:block">
        <img
          src="/images/red_star.svg"
          alt=""
          className="w-16 h-16 rotate-[-10deg]"
        />
      </div>

      {/* Bottom Left - Yellow Diamond */}
      <div className="absolute bottom-[-10%] z-30 left-[2%] hidden md:block">
        <img
          src="/images/yellow_diamond_cta.svg"
          alt=""
          className="w-[110px] h-[114px]"
        />
      </div>

      {/* Top Right - Green Blob (Teal Shine) */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 hidden md:block z-20">
        <img
          src="/images/teal_shine.svg"
          alt=""
          className="w-48 h-48 opacity-90"
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
      <div className="absolute bottom-[14%] right-[33%] hidden md:block">
        <img
          src="/images/flower_cta.svg"
          alt=""
          className="w-[62px] h-[62px]"
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

      {/* Social Sticky Sidebar Mockup */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-[#E2F7ED] border-2 border-black rounded-l-[20px] p-4 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#000]">
          <div className="w-6 h-6 text-[#0077B5]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>
          <div className="w-6 h-6 text-[#1DA1F2]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
