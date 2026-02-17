import { motion } from "framer-motion";

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <div
      className="bg-daisy-white rounded-[48px] p-8 md:p-10 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero_bg.svg')",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk tracking-tighter leading-none mb-8">
            Where The{" "}
            <span className="inline-block bg-tangelo-orange text-white px-6 py-2 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#000] rotate-[-2deg] mx-2">
              World
            </span>{" "}
            Speaks
            <br />
            Together{" "}
            <span className="inline-flex relative items-center justify-center ml-4">
              {/* Creative Shape Cluster */}
              <div className="relative animate-bounce">
                {/* Main Starburst */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 fill-soft-orange stroke-black stroke-[3px]"
                >
                  <path d="M50 0 L58 35 L90 25 L70 50 L90 75 L58 65 L50 100 L42 65 L10 75 L30 50 L10 25 L42 35 Z" />
                </svg>
                {/* Floating Blue Square */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-lagoon-blue border-2 border-black rotate-[25deg] shadow-[2px_2px_0px_0px_#000]"></div>
                {/* Purple Sparkle */}
                <div className="absolute -bottom-2 -right-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 fill-azure-green stroke-black stroke-[1.5px] rotate-[-15deg]"
                  >
                    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
                  </svg>
                </div>
              </div>
            </span>
          </h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="flex -space-x-4 mb-8"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { x: -20, opacity: 0, scale: 0.8 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 100,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  zIndex: 20,
                  transition: { duration: 0.2 },
                }}
                className="relative w-16 h-16 cursor-pointer"
              >
                {/* The Black Shadow Background */}
                <div className="absolute inset-0 bg-black rounded-full translate-x-1 translate-y-1"></div>
                {/* The Image Wrapper */}
                <div className="absolute inset-0 rounded-full border-2 border-black overflow-hidden bg-white">
                  <img
                    src={`/images/avatar${i}.png`}
                    alt={`Avatar ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-xl md:text-2xl font-medium text-dark-space/80 max-w-2xl mb-10 leading-relaxed">
            A real-time multilingual community platform where everyone speaks
            their own language — and everyone understands.
          </p>

          <button
            onClick={onJoinClick}
            className="btn-neubrutalism text-xl px-12 py-5 mb-6 active:scale-95 transition-transform"
          >
            Join The Pulse <span className="ml-2">›</span>
          </button>

          <p className="text-sm font-bold font-space-grotesk text-dark-space/40 tracking-tight">
            Powered by{" "}
            <a
              href="https://lingo.dev/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tangelo-orange underline hover:opacity-80 transition-opacity"
            >
              Lingo.dev
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
